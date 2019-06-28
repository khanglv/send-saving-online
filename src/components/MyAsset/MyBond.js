import React, {Component} from 'react';
import {
    Row, 
    Col,
    Label
} from 'reactstrap';
import ModalSaleBond from '../../components/Modal/ModalSaleBond';
import ModalShowDateInterest from './ModalShowDateInterest';
import { Tabs, DatePicker, Icon, Tooltip, Table, Popconfirm, Button } from 'antd';
import moment from 'moment';

import {connect} from 'react-redux';
import {getListBondsOfInvestor} from '../../stores/actions/getListBondsOfInvestorAction';
import * as common from '../Common/Common';
import { withRouter } from "react-router";

const TabPane = Tabs.TabPane;
const dateFormat = 'DD/MM/YYYY';

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
                width: 100,
                render: (text, record) =>{
                    return(
                        this.state.dataSource.length >= 1 ?
                            <div>
                                <Tooltip title="Mua thêm trái phiếu" className="pointer">
                                    <Icon type="shopping-cart" style={{color: '#4b81ba', fontSize: 16}} onClick={this.buyMoreBonds}/>
                                </Tooltip>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Popconfirm title="Bán trái phiếu này???" onConfirm={() => this.handleDelete()}>
                                    <Tooltip title="Bán trái phiếu" placement="right" className="pointer">
                                        <Icon type="sliders" style={{color: '#f5222d', fontSize: 16}}/>
                                    </Tooltip>
                                </Popconfirm>
                            </div>
                         : null
                    )
                }
            },
            {
                title: 'Trái Phiếu', //1
                dataIndex: 'MSTP',
                width: 250,
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
                width: 200
            },
            {
                title: 'Tổng giá trị',
                dataIndex: 'TONGGIATRI',
                width: 220
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
                width: 150,
                render: (NGAY_TRAITUC)=>{
                    return (
                        <Button className="middle-div" icon="exclamation-circle" onClick={()=>this.onDetailDateInterest(NGAY_TRAITUC)}>Xem chi tiết</Button>
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
            lstSetCommand: []
        };
    }

    componentDidMount(){
        this.loadData();
    }

    loadData = async()=>{
        try {
            const res = await this.props.getListBondsOfInvestor('311819634', 1);
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
                this.setState({dataSource: lstTmp});
            }
            const res_2 = await this.props.getListBondsOfInvestor('311819634', 0);
            if(res.type === "GET_LIST_BONDS_OF_INVESTOR_FAILED"){
                common.notify('error', 'Thao tác thất bại :( ');
            }else{
                const lstTmp = await (res_2.data.filter(item => item.FLAG === 1)).map((item, i) => {
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
                this.setState({dataSource_2: lstTmp});
            }
        } catch (error) {
            console.log("err load data " + error);
        }
    }

    buyMoreBonds = ()=>{
        this.props.history.push('/main');
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