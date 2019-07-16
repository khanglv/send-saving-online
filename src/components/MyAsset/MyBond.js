import React, {Component} from 'react';
import {
    Row, 
    Col,
    Label
} from 'reactstrap';
import ModalSaleBond from '../../components/Modal/ModalSaleBond';
import ModalShowDateInterest from './ModalShowDateInterest';
import { Tabs, DatePicker, Icon, Tooltip, Table, Modal } from 'antd';
import moment from 'moment';
import {updateSetCommand} from '../../api/api';
import {connect} from 'react-redux';
import {getListBondsOfInvestor} from '../../stores/actions/getListBondsOfInvestorAction';
import * as common from '../Common/Common';
import { withRouter } from "react-router";

const TabPane = Tabs.TabPane;
const dateFormat = 'DD/MM/YYYY';
const { confirm } = Modal;

class BondsAsset extends Component{
    constructor(props){
        super(props);
        this.columns = [
            {
                title: 'STT',
                dataIndex: 'key',
                width: 30
            },
            {
                title: 'Action',
                dataIndex: 'operation',
                width: 150,
                render: (text, record) =>{
                    return(
                        record.TRANGTHAI_LENH === 1 ?
                            <div>
                                <Tooltip title="Mua thêm trái phiếu" className="pointer">
                                    <Icon type="shopping-cart" style={{color: '#4b81ba', fontSize: 16}} onClick={this.buyMoreBonds}/>
                                </Tooltip>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Tooltip title="Bán trái phiếu" placement="right" className="pointer">
                                    <Icon type="sliders" style={{color: '#f5222d', fontSize: 16}} onClick={()=>this.handleDelete(record)}/>
                                </Tooltip>
                            </div>
                         : <span style={{color: 'orange'}}>Đang chờ duyệt</span>
                    )
                }
            },
            {
                title: 'Trái Phiếu', //1
                dataIndex: 'MSTP',
                width: 230,
                render: (MSTP, record)=>{
                    return(
                        <div>
                            {record.TRANGTHAI_LENH === 1 ? <Icon type="check-circle" theme="filled" style={{ color: '#1cd356'}}/> : null}&nbsp;{MSTP}
                        </div>
                    )
                }
            },
            {
                title: 'MS Người giới thiệu', //3
                dataIndex: 'MS_NGUOI_GT',
                width: 150
            },
            {
                title: 'Số lượng',
                dataIndex: 'SOLUONG',
                width: 100
            },
            {
                title: 'Đơn giá',
                dataIndex: 'DONGIA',
                width: 150
            },
            {
                title: 'Tổng giá trị',
                dataIndex: 'TONGGIATRI',
                width: 200
            },
            {
                title: 'Lãi suất (%)',
                dataIndex: 'LAISUAT_DH',
                width: 100
            },
            {
                title: 'Ngày giao dịch',
                dataIndex: 'NGAY_GD',
                width: 150
            },
            {
                title: 'Ngày trái tức',
                dataIndex: 'NGAY_TRAITUC',
                width: 130,
                render: (NGAY_TRAITUC)=>{
                    return (
                        <div className="text-center">
                            <Tooltip title="Xem chi tiết" className="pointer">
                                <Icon type="schedule" style={{fontSize: 18, color: '#4b79a1'}} onClick={()=>this.onDetailDateInterest(NGAY_TRAITUC)}/>
                            </Tooltip>
                        </div>
                    )
                }
            },
            {
                title: 'Ghi chú',
                dataIndex: 'GHICHU',
                width: 220
            },
        ];

        this.state = {
            isOpen: false,
            openModal: false,
            dataSource: [],
            dataSource_2: [],
            lstSetCommand: [],
            accountInfo: JSON.parse(localStorage.getItem('accountInfoKey')),
            isLoading: true
        };
    }

    componentDidMount(){
        this.loadData();
    }

    loadData = async()=>{
        try {
            const res = await this.props.getListBondsOfInvestor(this.state.accountInfo[0].accountNumber, 1);
            if(res.type === "GET_LIST_BONDS_OF_INVESTOR_FAILED"){
                common.notify('error', 'Thao tác thất bại :( ');
            }else{
                const lstTmp = await (res.data.filter(item => item.FLAG === 1)).map((item, i) => {
                    return {
                        ...item,
                        "NGAYTAO": common.convertDDMMYYYY(item.NGAYTAO),
                        "NGAY_GD": common.convertDDMMYYYY(item.NGAY_GD),
                        "NGAYHUY": common.convertDDMMYYYY(item.NGAYHUY),
                        "DONGIA": common.convertTextDecimal(item.DONGIA),
                        "TONGGIATRI": common.convertTextDecimal(item.TONGGIATRI),
                        "key": i + 1
                    }
                })
                this.setState({dataSource: lstTmp, isLoading: false});
            }
            const res_2 = await this.props.getListBondsOfInvestor(this.state.accountInfo[0].accountNumber, 0);
            if(res_2.type === "GET_LIST_BONDS_OF_INVESTOR_FAILED"){
                common.notify('error', 'Thao tác thất bại :( ');
            }else{
                const lstTmp_2 = await (res_2.data.filter(item => item.FLAG === 1)).map((item, i) => {
                    return {
                        ...item,
                        "NGAYTAO": common.convertDDMMYYYY(item.NGAYTAO),
                        "NGAY_GD": common.convertDDMMYYYY(item.NGAY_GD),
                        "NGAYHUY": common.convertDDMMYYYY(item.NGAYHUY),
                        "DONGIA": common.convertTextDecimal(item.DONGIA),
                        "TONGGIATRI": common.convertTextDecimal(item.TONGGIATRI),
                        "key": i + 1
                    }
                })
                this.setState({dataSource_2: lstTmp_2, isLoading: false});
            }
        } catch (error) {
            console.log("err load data " + error);
        }
    }

    buyMoreBonds = ()=>{
        this.props.history.push('/main');
    }

    handleDelete = (data)=>{
        let that = this;
        confirm({
            title: 'Xác nhận',
            content: 'Bạn muốn bán trái phiếu hay không ?',
            async onOk() {
                try{
                    const req = await updateSetCommand({
                        MSDL: data.MSDL,
                        MSTS: data.MSTS,
                        status: 3,
                    });
                    if(!req.error) {
                        that.loadData();
                        common.notify("success", "Thao tác thành công !!!");
                    }else{
                        common.notify("error", "Thao tác thất bại :(");
                    }
                }catch(err){
                    common.notify("error", "Thao tác thất bại :(");
                }
            },
            onCancel() {
                
            },
        });
    }

    updateBondsSale = ()=>{
        
    }

    onDetailDateInterest = (data)=>{
        this.setState({openModal: true, lstSetCommand: data});
    }

    handleCloseModal = ()=>{
        this.setState({openModal: false});
    }

    buyMoreBond = ()=>{
        this.setState({isOpen: true});
    }

    onClose = ()=>{
        this.setState({isOpen: false});
    }

    render(){
        return(
            <div style={{padding: 10}}>
                <ModalSaleBond open={this.state.isOpen} onClose={this.onClose}/>
                <ModalShowDateInterest isOpen={this.state.openModal} isCloseModal={this.handleCloseModal} lstSetCommand={this.state.lstSetCommand}/>
                <Tabs>
                    <TabPane tab="Trái phiếu hiện có" key="1">
                        <div className="p-top10" style={{padding: 10}}>
                            <Table
                                bordered
                                dataSource={this.state.dataSource}
                                size="small"
                                columns={this.columns}
                                pagination={{ pageSize: 15 }}
                                loading={this.state.isLoading}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="Đang chờ duyệt" key="2">
                        <div className="p-top10" style={{padding: 10}}>
                            <Table
                                bordered
                                dataSource={this.state.dataSource_2}
                                size="small"
                                columns={this.columns}
                                pagination={{ pageSize: 15 }}
                                loading={this.state.isLoading}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="Lịch sử giao dịch" key="3">
                        <Row>
                            <Col sm="8"></Col>
                            <Col sm="2">
                                <div>
                                    <Label for="exampleSelect" style={styles.labelOption}>Từ ngày</Label>
                                    <DatePicker className="datePickerNone" defaultValue={moment(new Date(), dateFormat)} format={dateFormat} />
                                </div>
                            </Col>
                            <Col sm="2">
                                <div>
                                    <Label for="exampleSelect" style={styles.labelOption}>Đến ngày</Label>
                                    <DatePicker className="datePickerNone" defaultValue={moment(new Date(), dateFormat)} format={dateFormat} />
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        lstBondsOfInvestor: state.getListBondsOfInvestor.data,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getListBondsOfInvestor: (codeInvestor, status)=> dispatch(getListBondsOfInvestor(codeInvestor, status)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (BondsAsset));

const styles={
    customTable:{
        boxShadow: '0 1px 2px rgba(0,0,0,0.23)',
        borderRadius: 5,
    },
    headerTable:{
        backgroundColor: '#528fc7',
        color: '#fff'
    },
    labelOption: {
        position: 'absolute', 
        top: '-0.8rem', 
        backgroundColor: '#fff', 
        left: '1.5rem', 
        paddingLeft: 5, 
        paddingRight: 5,
        fontSize: 13,
        color: '#4b81ba',
        zIndex: '1000'
    },
}