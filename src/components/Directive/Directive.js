import React, {Component} from 'react';
import {
    Row, 
    Col,
    Label,
    Alert,
    FormGroup,
    Button
} from 'reactstrap';
import { Tabs, DatePicker, Select, Modal, Badge, Input, Icon, Skeleton, Empty, Table, Spin, Radio } from 'antd';
import {debounce} from 'lodash';
import moment from 'moment';
import * as common from '../Common/Common';
import * as formula from '../Common/Formula';
import {connect} from 'react-redux';
import {getListRoomVCSC} from '../../stores/actions/roomVCSCAction';
import {getDetailBond} from '../../stores/actions/getDetailBondAction';
import {getCashBalance} from '../../stores/actions/cashBalanceAction';
import {buyBondsRoomVCSC, getListFeeTrade} from '../../api/api';

const TabPane = Tabs.TabPane;
const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';
const { confirm } = Modal;

class Directive extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            detailBond: {},
            quantityBond: 0,
            buyDate: moment(new Date(), dateFormat),
            feeTrade: 0,
            dataInterestReturn: [],
            isPending: false,
            isShowWarning: 0,
            isFetching: true,
            isActiveOption: 1,
            accountInfo: JSON.parse(localStorage.getItem('accountInfoKey'))
        }
    }

    componentDidMount(){
        this.loadData();
    }

    loadData = async()=>{
        try {
            const res = await this.props.getListRoomVCSC();
            if(res.type === "ROOM_VCSC_FAILED"){
                this.setState({isFetching: false});
                common.notify('error', 'Thao tác thất bại :( ');
            }else{
                let idBondDefault = res.data[0].BOND_ID;
                const defaultData = await this.props.getDetailBond(idBondDefault);
                this.setState({isFetching: false});
                if(defaultData){
                    this.setState({detailBond: {
                        ...defaultData.data,
                        "GIATRI_HIENTAI": defaultData.data.GIATRI_HIENTAI === null ? defaultData.data.MENHGIA : defaultData.data.GIATRI_HIENTAI,
                    }});
                }
            }
            const res2 = await this.props.ongetCashBalance(this.state.accountInfo[0].accountNumber);
            if(res2.type === "CASH_BALANCE_FAILED"){
                common.notify('error', 'Thao tác thất bại :( ');
            }
        } catch (error) {
            this.setState({isFetching: false});
            console.log("err load data " + error);
        }
    }

    showConfirm = (data, lstTmpDateInterest)=> {
        if(this.state.quantityBond === 0 || this.state.quantityBond === null){
            this.setState({isShowWarning: 1});
        }else if(this.state.feeTrade === 0){
            this.setState({isShowWarning: 2});
        }else{
            this.setState({isShowWarning: false});
            let that = this;
            confirm({
                title: 'Xác nhận',
                content: 'Bạn muốn mua trái phiếu hay không ?',
                onOk() {
                    that.onConfirmBuy(data, lstTmpDateInterest);
                },
                onCancel() {
                    
                },
            });
        }
    }

    updateInputDate = name => (value)=>{
        this.setState({[name]: value});
    }

    updateSelectedValue = async(event)=>{
        const res = await this.props.getDetailBond(event);
        await this.setState({detailBond: {
            ...res.data,
            "GIATRI_HIENTAI": res.data.GIATRI_HIENTAI === null ? res.data.MENHGIA : res.data.GIATRI_HIENTAI,
        }});
    }

    updateInputValue = (event)=>{
        this.setState({[event.target.name]: event.target.value, isShowWarning: 0});
        if( event.target.name === 'quantityBond'){
            this.callApiCheckFee();
        }
    }

    onChange = e => {
        this.setState({isActiveOption: e.target.value});
    };

    callApiCheckFee = debounce(async()=>{
        try {
            this.setState({ isPending: true });
            const res = await getListFeeTrade({
                status: 1,
                totalMoney: this.state.quantityBond * this.state.detailBond.GIATRI_HIENTAI
            });
            this.setState({ isPending: false });
            if (!res.error) {
                this.setState({ feeTrade: res.TYLETINH });
            } else {
                this.setState({ feeTrade: 0 });
                // common.notify("error", res.error);
            }
        } catch (error) {
            this.setState({ isPending: false });
            common.notify("error", "Thao tác thất bại");
        }
    }, 300);

    onConfirmBuy = async(data, lstTmpDateInterest)=>{
        try {
            const dataTranfer = await lstTmpDateInterest.map((item)=>{
                return{
                    ...item,
                    "moneyReceived": item.totalDay*data.LAISUAT_BAN*data.moneyBuy/(100* data.SONGAYTINHLAI)
                }
            });

            let dataTmp = {
                "BOND_ID": data.BONDID,
                "MS_NDT": this.state.accountInfo[0].accountNumber,
                "MS_ROOM": data.MSROOM,
                "MS_NGUOI_GT": "MS_01",
                "SOLUONG": this.state.quantityBond,
                "DONGIA": data.GIATRI_HIENTAI,
                "TONGGIATRI": this.state.quantityBond * data.GIATRI_HIENTAI * (1 + data.feeTrade/100),
                "LAISUAT_DH": data.LAISUAT_BAN,
                "NGAY_TRAITUC": JSON.stringify(dataTranfer),
                "NGAY_GD": this.state.buyDate,
                "TONGGIATRITRUOCPHI": this.state.quantityBond * data.GIATRI_HIENTAI
            }
            const res = await buyBondsRoomVCSC(dataTmp);
            if(res.error){
                common.notify('error', 'Thao tác thất bại :( ');
            }else{
                common.notify('success', 'Thao tác thành công ^^ ');
                await this.setState(
                    {
                        detailBond: {},
                        quantityBond: 0,
                        buyDate: moment(new Date(), dateFormat),
                    }
                );
                await this.loadData();
            }
        } catch (error) {
            
        }
    }

    render(){
        const {
            buyDate,
            quantityBond,
            detailBond = {}
        } = this.state;
        // const  { detailBond = {} }= this.state;
        const lstTmpDateInterest = Object.keys(detailBond).length > 0 ? formula.GenDateInterestRate(buyDate, detailBond.NGAYPH, detailBond.NGAYDH, detailBond.KYHAN, []) : null;

        const dataSource = lstTmpDateInterest ? lstTmpDateInterest.map((item, i) =>{
            return {
                ...item,
                "key": i,
                "date": common.convertDDMMYYYY(item.date),
                "totalMoneyReal": item.totalDay*detailBond.LAISUAT_BAN*quantityBond*detailBond.GIATRI_HIENTAI/(100* detailBond.SONGAYTINHLAI),
                "totalMoney": common.convertTextDecimal(item.totalDay*detailBond.LAISUAT_BAN*quantityBond*detailBond.GIATRI_HIENTAI/(100* detailBond.SONGAYTINHLAI))
            }
        }) : null;

        // const {
        //     dataInterestReturn
        // } = this.state;

        let totalMoneyReceive = dataSource ? dataSource.reduce((total, currentValue) => {
            return total + parseFloat(currentValue.totalMoneyReal);
        }, 0) : null;

        const columns = [
            {
                title: 'Nội dung',
                dataIndex: 'name',
                render: ()=> {
                    return(
                    <div>Coupon</div>
                )}
            },
            {
                title: 'Ngày nhận',
                dataIndex: 'date',
            },
            {
                title: 'Tiền nhận (VND)',
                dataIndex: 'totalMoney',
            },
        ];

        const columns_2 = [
            {
                title: 'T.Gian đầu tư',
                dataIndex: 'name',
                render: ()=> {
                    return(
                    <div>Coupon</div>
                )}
            },
            {
                title: 'LS chưa TĐT',
                dataIndex: 'date',
            },
            {
                title: 'LS đã TĐT',
                dataIndex: 'totalMoney',
            },
            {
                title: 'K.Hạn còn lại',
                dataIndex: 'totalMoney2',
            },
            {
                title: 'G.Bán minh họa',
                dataIndex: 'totalMoney3',
            }
        ];

        return(
            <Skeleton active loading={this.state.isFetching} >
                {!this.state.isFetching ? 
                    Object.keys(this.state.detailBond).length > 0 ? 
                    <div style={{padding: 10, height: '85vh', display: 'flex'}}>
                        <div style={styles.viewOptionLeft}>
                            <div className="p-top10" style={{position: 'relative'}}>
                                <Label for="exampleSelect" style={styles.labelInput}>Mã trái phiếu</Label>
                                <Select showSearch name="codeBond" style={{ background: 'none', width: '100%' }}
                                    value={detailBond.BONDID}
                                    onChange={event => this.updateSelectedValue(event)}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                                    {
                                        this.props.lstRoomVCSC.filter(item => item.FLAG === 1).map((item) => {
                                            return (
                                                <Option key={item.BOND_ID} value={item.BOND_ID}>{item.MSTP}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                            <div className="p-top20">
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label for="exampleSelect" style={styles.labelOption}>Ngày phát hành</Label>
                                            <Input disabled value={common.convertDDMMYYYY(detailBond.NGAYPH)} style={{ background: 'none', color: '#000000a6' }}></Input>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="exampleSelect" style={styles.labelOption}>Ngày đáo hạn</Label>
                                            <Input disabled value={common.convertDDMMYYYY(detailBond.NGAYDH)} style={{ background: 'none', color: '#000000a6' }}></Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="p-top10">
                                    <Col>
                                        <FormGroup>
                                            <Label for="exampleSelect" style={Object.assign({}, styles.labelOption, {zIndex: '1000'})}>Ngày giao dịch</Label>
                                            <DatePicker style={{width: '100%'}} format={dateFormat} value={buyDate} onChange={this.updateInputDate('buyDate')}/>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for="exampleSelect" style={styles.labelOption}>Số lượng</Label>
                                            <Input type="number" name="quantityBond" value={this.state.quantityBond} onChange={event => this.updateInputValue(event)} style={{maxHeight: 34}}/>
                                            {this.state.isShowWarning === 1 ? <i style={{color: 'orange', fontSize: 14}}>Cần phải nhập số lượng trái phiếu</i> : 
                                            this.state.isShowWarning === 2 ? <i style={{color: 'orange', fontSize: 14}}>Không tìm thấy tỉ lệ tính lãi suất, liên hệ quản trị viên</i> : null}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                
                                <Row>
                                    <Col>
                                        <Badge color="#4b81ba" />Số lượng PH: <b >{common.convertTextDecimal(detailBond.SL_DPH)}</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="centerVertical">
                                        <Badge color="#4b81ba" />Đơn giá:&nbsp;<span style={{color: 'red'}}>{common.convertTextDecimal(detailBond.GIATRI_HIENTAI)}</span><span style={{fontSize: 10}}>&nbsp;VND</span>
                                    </Col>
                                </Row>
                                <div className="p-top10" style={styles.borderBottomRadiusDasher} ></div>
                                <Row className="p-top10">
                                    <Col className="centerVertical">
                                        <Badge color="#4b81ba" />Giá tiền mua:&nbsp;<span style={{color: 'red'}}>{common.convertTextDecimal(detailBond.GIATRI_HIENTAI*this.state.quantityBond)}</span><span style={{fontSize: 10}}>&nbsp;VND</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="centerVertical">
                                        <Badge color="#4b81ba" />Phí dịch vụ ({this.state.feeTrade}%):
                                        &nbsp;<span style={{color: 'red'}}>{common.convertTextDecimal(detailBond.GIATRI_HIENTAI*this.state.quantityBond*this.state.feeTrade/100)}</span><span style={{fontSize: 10}}>&nbsp;VND</span>
                                        &nbsp;<Spin spinning={this.state.isPending}/>
                                    </Col>
                                </Row>
                                <div className="p-top10" style={styles.borderBottomRadiusDasher} ></div>
                                <Row className="p-top10">
                                    <Col className="centerVertical">
                                        <Badge color="#4b81ba" />Tài sản hiện có:&nbsp;<span style={{color: 'red'}}>{common.convertTextDecimal(this.props.cashBalance.depositAmount)}</span><span style={{fontSize: 10}}>&nbsp;VND</span>
                                    </Col>
                                </Row>
                            </div>
                            <div className="p-top10" style={styles.borderBottomRadius}></div>
                            {/* <div className="p-top10">
                                <Row>
                                    <Col sm="9">
                                        <span>Lãi suất giữ đến đáo hạn (đã tái đầu tư)</span>
                                    </Col>
                                    <Col sm="3">
                                        <span style={{color: 'red'}}> 8.29</span>%
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="9">
                                        <Checkbox onChange={this.onChange}><span style={{fontSize: 16, color: '#000'}}>Đăng kí trái tức sinh lời để hưởng lãi suất</span></Checkbox>
                                    </Col>
                                    <Col sm="3">
                                        <span style={{color: 'red'}}> 8.36</span>%
                                    </Col>
                                </Row>
                            </div>
                            <div className="p-top10" style={styles.borderBottomRadius}></div> */}
                            {/* <div className="p-top20">
                                <Row>
                                    <Col>
                                        <Input placeholder="Mã giới thiệu"></Input>
                                    </Col>
                                    <Col>
                                        <span style={{color: 'red'}} ><i className="fa fa-question-circle"></i> <span style={{fontSize: 14}}>Tìm hiểu chương trình</span></span>
                                    </Col>
                                </Row>
                            </div> */}
                            <div className="p-top10">
                                <Row>
                                    <Col sm="8">
                                        <div className="centerVertical">
                                            <Icon type="swap-right" style={{color: 'green', fontSize: 18}} />&nbsp;Tổng tiền đầu tư
                                        </div>
                                        <div className="centerVertical">
                                            <span style={{color: 'red', fontSize: 24, marginLeft: '1.5rem'}}>{common.convertTextDecimal(this.state.quantityBond * detailBond.GIATRI_HIENTAI * (1 + this.state.feeTrade/100))}</span><span style={{fontSize: 14}}>&nbsp;VND</span>
                                        </div>
                                    </Col>
                                    <Col sm="4" style={{padding: 0}}>
                                        <Button color="primary" onClick={()=>this.showConfirm(detailBond, lstTmpDateInterest)}>Đặt mua</Button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div style={styles.viewOptionRight}>
                            <div style={{position: 'relative'}}>
                                <Alert color="primary" style={{marginBottom: '0.3rem'}}>
                                    <b>{detailBond.MSTP}</b>
                                </Alert>
                                <span>
                                    <i>Đáo hạn:</i> <span className="index-color">{common.convertDDMMYYYY(detailBond.NGAYDH)}</span> <i>- Tổ chức phát hành:</i> <b className="index-color">{detailBond.TEN_DN}</b>
                                </span>
                            </div>
                            <div>
                                <Tabs>
                                    <TabPane tab="Giữ đến đáo hạn" key="1">
                                        <Radio.Group onChange={this.onChange} value={this.state.isActiveOption}>
                                            <Radio style={{color: '#17a2b8'}} value={1}>Chưa tái đầu tư</Radio>
                                            <Radio style={{color: '#a80f0f'}} value={2}>Tái đầu tư</Radio>
                                        </Radio.Group>
                                        <div className="p-top10">
                                            <Table 
                                                columns={columns} 
                                                dataSource={dataSource}
                                                bordered={true}
                                                pagination={false}
                                                size="small" 
                                            />
                                        </div>
                                        <div className="p-top10" style={styles.borderBottomRadiusDasher} ></div>

                                        <div className="p-top10">
                                            <div style={{ display: 'flow-root' }}>
                                                <b className="left index-color">Tổng tiền nhận</b>
                                                <div className="right centerVertical"><span style={{ color: 'red' }}>{common.convertTextDecimal(quantityBond * detailBond.GIATRI_HIENTAI + totalMoneyReceive)}</span><span style={{fontSize: 10}}>&nbsp;VND</span></div>
                                            </div>
                                            <div style={{ display: 'flow-root' }}>
                                                <b className="left index-color">Gốc đầu tư</b>
                                                <div className="right centerVertical"><span>{common.convertTextDecimal(this.state.quantityBond * detailBond.GIATRI_HIENTAI * (1 + this.state.feeTrade/100))}</span><span style={{fontSize: 10}}>&nbsp;VND</span></div>
                                            </div>
                                            <div style={{ display: 'flow-root' }}>
                                                <b className="left index-color">Lãi đầu tư</b>
                                                <div className="right">{detailBond.LAISUAT_BAN}(%)</div>
                                            </div>
                                            <div style={{ display: 'flow-root' }}>
                                                <b className="left index-color">Cho thời gian</b>
                                                <div className="right">{formula.diffMonth(detailBond.NGAYPH, detailBond.NGAYDH)} tháng</div>
                                            </div>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="Bán trước đáo hạn" key="2">
                                        <Table
                                            columns={columns_2}
                                            dataSource={dataSource}
                                            bordered={true}
                                            pagination={false}
                                            size="small"
                                        />
                                        <div className="p-top10" style={styles.borderBottomRadiusDasher}></div>
                                        <div style={{fontSize: 13}}>
                                            <i>Thuật ngữ: &nbsp;</i><span className="index-color">TĐT</span> - Tái đầu tư
                                        </div>
                                    </TabPane>
                                </Tabs>
                            </div>
                            <div className="p-top10" style={styles.borderBottomRadius}></div>
                            <div className="p-top10">
                                <div style={{color: 'red'}}>*Lưu ý</div>
                                <span>{detailBond.DIEUKHOAN_LS}</span>
                            </div>
                        </div>
                    </div> : <div className="text-center"><Empty /></div> : null }
            </Skeleton>
        )
    }
}

const mapStateToProps = state =>{
    return{
        lstRoomVCSC: state.roomVCSC.data,
        itemBond: state.getDetailBond.data,
        cashBalance: state.cashBalance.data
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getListRoomVCSC: ()=> dispatch(getListRoomVCSC()),
        getDetailBond: (idBond)=> dispatch(getDetailBond(idBond)),
        ongetCashBalance: (accountNumber)=> dispatch(getCashBalance(accountNumber))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Directive);

const styles = {
    viewOptionLeft:{
        padding: 10,
        backgroundColor: '#fff',
        height: '100%',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.23)',
        borderRadius: 5,
        flex: 1,
    },
    viewOptionRight:{
        padding: 10,
        backgroundColor: '#fff',
        height: '100%',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.23)',
        marginLeft: 10,
        borderRadius: 5,
        flex: 3,
        overflow: 'auto'
    },
    labelInput: {
        position: 'absolute', 
        top: '-0.3rem', 
        backgroundColor: '#fff', 
        left: '1rem', 
        paddingLeft: 5, 
        paddingRight: 5,
        color: '#4b81ba',
        fontSize: 13,
        zIndex: '1000'
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
        zIndex: 1000
    },
    borderBottomRadius:{
        borderBottom: '1px solid #e2e4ea'
    },
    borderBottomRadiusDasher:{
        borderBottom: '1px dashed #f0f3f5'
    },
}