import React, {Component} from 'react';
import {
    Row, 
    Col,
    Label,
    Input,
    Alert,
    Table,
    FormGroup,
    Button
} from 'reactstrap';
import { Tabs, DatePicker } from 'antd';
import moment from 'moment';
import * as common from '../Common/Common';
import * as formula from '../Common/Formula';
import {connect} from 'react-redux';
import {getListRoomVCSC} from '../../stores/actions/roomVCSCAction';
import {getDetailBond} from '../../stores/actions/getDetailBondAction';
import {getCashBalance} from '../../stores/actions/cashBalanceAction';
import {buyBondsRoomVCSC} from '../../api/api';

const TabPane = Tabs.TabPane;
const dateFormat = 'DD/MM/YYYY';

class Directive extends Component{
    constructor(props){
        super(props);
        this.state = {
            detailBond: {},
            quantityBond: 0,
            buyDate: moment(new Date(), dateFormat),
            isShowWarning: false
        }
    }

    componentDidMount(){
        this.loadData();
    }

    loadData = async()=>{
        try {
            const res = await this.props.getListRoomVCSC();
            if(res.type === "ROOM_VCSC_FAILED"){
                common.notify('error', 'Thao tác thất bại :( ');
            }else{
                let idBondDefault = res.data[0].BOND_ID;
                const defaultData = await this.props.getDetailBond(idBondDefault);
                if(defaultData){
                    this.setState({detailBond: defaultData.data});
                }
            }
            // const res2 =  await this.props.ongetCashBalance(this.state.accountInfo[0].accountNumber);
            // if(res2.type === "CASH_BALANCE_FAILED"){
            //     common.notify('error', 'Thao tác thất bại :( ');
            // }else{
            //     this.setState({lstData: res.data});
            // }
        } catch (error) {
            console.log("err load data " + error);
        }
    }

    updateInputDate = name => (value)=>{
        this.setState({[name]: value});
    }

    updateSelectedValue = async(event)=>{
        const res = await this.props.getDetailBond(event.target.value);
        this.setState({detailBond: res.data});
    }

    updateInputValue = (event)=>{
        this.setState({[event.target.name]: event.target.value});
    }

    onConfirmBuy = async(data, lstTmpDateInterest)=>{
        if(this.state.quantityBond === 0 || this.state.quantityBond === null){
            this.setState({isShowWarning: true});
        }else{
            this.setState({isShowWarning: false});
            try {
                const dataTranfer = await lstTmpDateInterest.map((item)=>{
                    return{
                        ...item,
                        "moneyReceived": (item.interestRate)*(this.state.quantityBond * data.GIATRI_HIENTAI)/100
                    }
                });
    
                let dataTmp = {
                    "BOND_ID": data.BONDID,
                    "MS_NDT": "311819634",
                    "MS_ROOM": data.MSROOM,
                    "MS_NGUOI_GT": "MS_01",
                    "SOLUONG": this.state.quantityBond,
                    "DONGIA": data.GIATRI_HIENTAI,
                    "TONGGIATRI": this.state.quantityBond * data.GIATRI_HIENTAI,
                    "LAISUAT_DH": data.LAISUAT_HH,
                    "NGAY_TRAITUC": JSON.stringify(dataTranfer),
                    "NGAY_GD": this.state.buyDate,
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
    }

    render(){
        const data = this.state.detailBond;
        const lstTmpDateInterest = Object.keys(data).length > 0 ? formula.GenDateInterestRate(this.state.buyDate, data.NGAYPH, data.NGAYDH, data.SONGAYTINHLAI, data.KYHAN, data.LAISUAT_HH, []) : null;
        let totalMoneyReceive = lstTmpDateInterest ? lstTmpDateInterest.reduce((total, currentValue)=> {
            return total + JSON.parse(currentValue.interestRate);
        }, 0) : null;

        return(
            <div style={{padding: 10, height: '85vh', display: 'flex'}}>
                <div style={styles.viewOptionLeft}>
                    <div className="p-top10" style={{position: 'relative'}}>
                        <Label for="exampleSelect" style={styles.labelInput}>Mã trái phiếu</Label>
                        <Input type="select" name="codeBond" style={{ background: 'none' }} onChange={event => this.updateSelectedValue(event)}>
                            {
                                this.props.lstRoomVCSC.map((item) => {
                                    return (
                                        item.FLAG === 1 ? <option key={item.BOND_ID} value={item.BOND_ID}>{item.MSTP}</option> : null
                                    )
                                })
                            }
                        </Input>
                    </div>
                    <div className="p-top20">
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleSelect" style={styles.labelOption}>Ngày phát hành</Label>
                                    <Input disabled value={common.convertDDMMYYYY(data.NGAYPH)} style={{ background: 'none' }}></Input>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleSelect" style={styles.labelOption}>Ngày đáo hạn</Label>
                                    <Input disabled value={common.convertDDMMYYYY(data.NGAYDH)} style={{ background: 'none' }}></Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="p-top10">
                            <Col>
                                <FormGroup>
                                    <Label for="exampleSelect" style={Object.assign({}, styles.labelOption, {zIndex: '1000'})}>Ngày giao dịch</Label>
                                    <DatePicker format={dateFormat} value={this.state.buyDate} onChange={this.updateInputDate('buyDate')}/>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleSelect" style={styles.labelOption}>Số lượng</Label>
                                    <Input type="number" name="quantityBond" value={this.state.quantityBond} onChange={event => this.updateInputValue(event)} style={{maxHeight: 34}}/>
                                    {this.state.isShowWarning ? <i style={{color: 'orange', fontSize: 14}}>Cần phải nhập số lượng trái phiếu</i> : null}
                                </FormGroup>
                            </Col>
                        </Row>
                        <div>
                            <i>Hạn mức:</i> <span style={{color: 'red'}}>{common.convertTextDecimal(data.HANMUC_CHO)}</span> - <i>Đơn giá</i> <span style={{color: 'red'}}>{common.convertTextDecimal(data.GIATRI_HIENTAI)} VND</span>
                        </div>
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
                            <Col sm="7">
                                Tổng tiền đầu tư<br/>
                                <span style={{color: 'red', fontSize: 18}}>{common.convertTextDecimal(this.state.quantityBond * data.GIATRI_HIENTAI)} VND</span>
                            </Col>
                            <Col sm="5">
                                <Button color="primary" onClick={()=>this.onConfirmBuy(data, lstTmpDateInterest)}>Đặt mua</Button>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div style={styles.viewOptionRight}>
                    <div style={{position: 'relative'}}>
                        <Alert color="primary" style={{marginBottom: '0.3rem'}}>
                            <b>{data.MSTP}</b>
                        </Alert>
                        <span>
                            <i>Đáo hạn:</i> <span className="index-color">{common.convertDDMMYYYY(data.NGAYDH)}</span> <i>- Tổ chức phát hành:</i> <b className="index-color">{data.TEN_DN}</b>
                        </span>
                    </div>
                    <div className="p-top10">
                        <Tabs>
                            <TabPane tab="Giữ đến đáo hạn" key="1">
                                <Table bordered>
                                    <thead style={{background: '#4b81ba', color: '#fff'}}>
                                        <tr>
                                            <th>Nội dung</th>
                                            <th>Ngày nhận</th>
                                            <th>Tiền nhận (VND)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lstTmpDateInterest ? lstTmpDateInterest.map((item, index) =>
                                            <tr key={index}>
                                                <td>Coupon</td>
                                                <td>{common.convertDDMMYYYY(item.date)}</td>
                                                <td>{common.convertTextDecimal(item.interestRate * (this.state.quantityBond * data.GIATRI_HIENTAI) / 100)} ({item.interestRate}%)</td>
                                            </tr>
                                        ) : null}
                                    </tbody>
                                </Table>
                                <div style={{paddingBottom: 10}}>
                                    <div style={{ display: 'flow-root' }}>
                                        <b className="left index-color">Tổng tiền nhận</b>
                                        <div className="right"><span style={{ color: 'red' }}>{common.convertTextDecimal((this.state.quantityBond * data.GIATRI_HIENTAI) * (1 + totalMoneyReceive / 100))}</span> VND</div>
                                    </div>
                                    <div style={{ display: 'flow-root' }}>
                                        <b className="left index-color">Gốc đầu tư</b>
                                        <div className="right">{common.convertTextDecimal(this.state.quantityBond * data.GIATRI_HIENTAI)}</div>
                                    </div>
                                    <div style={{ display: 'flow-root' }}>
                                        <b className="left index-color">Lãi đầu tư</b>
                                        <div className="right">{data.LAISUAT_HH}(%)</div>
                                    </div>
                                    <div style={{ display: 'flow-root' }}>
                                        <b className="left index-color">Cho thời gian</b>
                                        <div className="right">{formula.diffMonth(data.NGAYPH, data.NGAYDH)} tháng</div>
                                    </div>
                                </div>
                            </TabPane>
                            {/* <TabPane tab="Bán trước đáo hạn" key="2">
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th>Thời gian đầu tư(tháng)</th>
                                            <th>LS chưa tái đầu tư</th>
                                            <th>LS đã tái đầu tư</th>
                                            <th>Kỳ hạn còn lại</th>
                                            <th>Giá bán còn lại</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>4.05 (%)</td>
                                            <td>4.05 (%)</td>
                                            <td>4.05 (%)</td>
                                            <td>4.05 (%)</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>4.05 (%)</td>
                                            <td>4.05 (%)</td>
                                            <td>4.05 (%)</td>
                                            <td>4.05 (%)</td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>4.05 (%)</td>
                                            <td>4.05 (%)</td>
                                            <td>4.05 (%)</td>
                                            <td>4.05 (%)</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </TabPane> */}
                        </Tabs>
                    </div>
                    <div className="p-top10" style={styles.borderBottomRadius}></div>
                    <div className="p-top10">
                        <div style={{color: 'red'}}>*Lưu ý</div>
                        <span>{data.DIEUKHOAN_LS}</span>
                    </div>
                </div>
            </div>
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
    },
    labelInput: {
        position: 'absolute', 
        top: '-0.3rem', 
        backgroundColor: '#fff', 
        left: '1rem', 
        paddingLeft: 5, 
        paddingRight: 5,
        color: '#4b81ba'
    },
    labelOption: {
        position: 'absolute', 
        top: '-0.8rem', 
        backgroundColor: '#fff', 
        left: '1.5rem', 
        paddingLeft: 5, 
        paddingRight: 5,
        fontSize: 13,
        color: '#4b81ba'
    },
    borderBottomRadius:{
        borderBottom: '1px solid #e2e4ea'
    },
}