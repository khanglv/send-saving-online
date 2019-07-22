import React, {Component} from 'react';
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Row, 
    Col,
    Badge,
    Alert
} from 'reactstrap';
import { DatePicker, Icon, Tabs, message, Tag , Timeline, Input, Table} from 'antd';
import {debounce} from 'lodash';
import moment from 'moment';
import * as common from '../Common/Common';
import * as formula from '../Common/Formula';
import {buyBondsRoomVCSC, getListFeeTrade} from '../../api/api';
const TabPane = Tabs.TabPane;
const dateFormat = 'DD/MM/YYYY';
const messSuccess = () => {
    message.success('Thao tác thành công !!!');
};

export class DetailBond extends Component{
    toggle = ()=> {
        this.props.onCloseDetail();
    }

    render(){
        const data = this.props.data
        return(
            <div>
                {data ? <Modal isOpen={this.props.openDetail} toggle={this.toggle} size="lg" centered>
                    <ModalHeader style={{backgroundColor: 'rgba(155, 183, 205, 0.48)'}}>Thông tin trái phiếu</ModalHeader>
                    <ModalBody>
                        <Timeline>
                            <Row>
                                <Col sm="4">
                                    <Timeline.Item>Tổ chức phát hành</Timeline.Item>
                                </Col>
                                <Col sm="8" style={{top: '-0.3rem'}}>
                                    <Tag color="volcano" style={{fontSize: 16}}>{data.TEN_DN}</Tag>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="4">
                                    <Timeline.Item>Đăng kí kinh doanh</Timeline.Item>
                                </Col>
                                <Col sm="8" style={{top: '-0.3rem'}}>
                                    {data.MSDN}
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="4">
                                    <Timeline.Item>Loại trái phiếu</Timeline.Item>
                                </Col>
                                <Col sm="8" style={{top: '-0.3rem'}}>
                                    <Tag color="green" style={{fontSize: 16}}>{data.TENLOAI_TP}</Tag>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="4">
                                    <Timeline.Item>Mệnh giá</Timeline.Item>
                                </Col>
                                <Col sm="8" style={{top: '-0.3rem'}}>
                                    <span style={{color: 'red'}}>{common.convertTextDecimal(data.MENHGIA)}</span> VND
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="4">
                                    <Timeline.Item>Lãi suất PH</Timeline.Item>
                                </Col>
                                <Col sm="8" style={{top: '-0.3rem'}}>
                                    <span style={{color: 'red'}}>{data.LAISUAT_BAN}</span> (%)
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="4">
                                    <Timeline.Item className="centerVertical" dot={<Icon type="clock-circle-o" />}>Ngày phát hành</Timeline.Item>
                                </Col>
                                <Col sm="8" style={{top: '-0.3rem'}}>
                                    {common.convertDDMMYYYY(data.NGAYPH)}
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="4">
                                    <Timeline.Item className="centerVertical" dot={<Icon type="clock-circle-o" />}>Ngày đáo hạn</Timeline.Item>
                                </Col>
                                <Col sm="8" style={{top: '-0.3rem'}}>
                                    {common.convertDDMMYYYY(data.NGAYDH)}
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="4">
                                    <Timeline.Item>Thanh toán gốc và lãi</Timeline.Item>
                                </Col>
                                <Col sm="8" style={{top: '-0.3rem'}}>
                                    Lãi trả <span style={{color: 'red'}}>{data.LOAI_TT}</span> tháng/lần, gốc trả cuối kì
                                </Col>
                            </Row>
                        </Timeline>
                        <Row>
                            <Col sm="4">
                                <Timeline>
                                    <Timeline.Item style={{paddingBottom: 0}}>Trạng thái</Timeline.Item>
                                </Timeline>
                            </Col>
                            <Col sm="8" style={{top: '-0.3rem'}}>
                                {data.TRANGTHAI === 1 ? <span style={{ color: 'green' }}>Đang niêm yết</span> : <span style={{ color: '#f46f02' }}>Không còn niêm yết</span>}
                            </Col>
                        </Row>
                        <Col style={styles.borderBottom}></Col>
                        <div className="p-top10">
                            <i style={{color: '#722ed1'}}>Điều khoản lãi suất</i> <br />
                            <span>{data.DIEUKHOAN_LS}</span>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Đóng</Button>{' '}
                    </ModalFooter>
                </Modal> : null}
            </div>
        )
    }
}

export class ModalBuyBond extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isOpenExpire: false,
            isOpenSaleBeforeExpire: false,
            quantityBond: 0,
            feeTrade: 0,
            buyDate: moment(new Date(), dateFormat),
            isShowWarning: 0,
            isPending: false
        }
    }

    toggle = ()=> {
        this.props.onClose();
        this.setState({isShowWarning: false});
    }

    onOpenKeepExpire = ()=>{
        if(this.state.quantityBond === 0 || this.state.quantityBond === null || this.state.quantityBond === ''){
            this.setState({isShowWarning: 1});
        }else{
            if(this.state.feeTrade === 0){
                this.setState({isShowWarning: 4});
            }else if(this.state.quantityBond > this.props.data.SL_DPH){
                this.setState({isShowWarning: 2});
            }else{
                if(this.state.quantityBond * this.props.data.GIATRI_HIENTAI > this.props.data.cashBalance.depositAmount){
                    this.setState({isShowWarning: 3});
                }else{
                    this.setState({isOpenExpire: true, isShowWarning: 0});
                }
            }
        }
    }

    onCloseExpired = ()=>{
        this.setState({isOpenExpire: false});
    }

    updateInputValue = (event)=>{
        this.setState({ [event.target.name]: event.target.value });
        if( event.target.name === 'quantityBond'){
            this.callApiCheckFee();
        }
    }

    callApiCheckFee = debounce(async()=>{
        try {
            this.setState({ isPending: true });
            const res = await getListFeeTrade({
                status: 1,
                totalMoney: this.state.quantityBond * this.props.data.GIATRI_HIENTAI
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

    updateInputDate = name => (value)=>{
        this.setState({[name]: value});
    }

    onOpenSaleBeforeExpire = ()=>{
        this.setState({isOpenSaleBeforeExpire: true});
    }

    onCloseSaleBeforeExpire = ()=>{
        this.setState({isOpenSaleBeforeExpire: false});
    }

    onLoadData = ()=>{
        this.props.loadData();
    }

    render() {
        const data = this.props.data;
        const closeBtn = <button className="close" style={{color: '#000', display: 'block'}} onClick={this.toggle}>&times;</button>;
        return (
            <div>
                {data ? <Modal isOpen={this.props.open} toggle={this.toggle} size="lg" centered >
                    <ModalHeader close={closeBtn} style={{backgroundColor: 'rgba(155, 183, 205, 0.48)'}}>Mua trái phiếu</ModalHeader>
                    <ModalBody>
                        <div>
                            <Timeline>
                                <Row>
                                    <Col md="5" xs="4">
                                        <Timeline.Item>Mệnh giá</Timeline.Item>
                                    </Col>
                                    <Col style={{top: '-0.3rem'}}>
                                        {common.convertTextDecimal(data.MENHGIA)} VND
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="5" xs="4">
                                        <Timeline.Item>Giá trị hiện tại</Timeline.Item>
                                    </Col>
                                    <Col style={{top: '-0.3rem'}}>
                                        <Tag color="volcano" style={{ fontSize: 16 }}>{common.convertTextDecimal(data.GIATRI_HIENTAI)}</Tag> VND
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="5" xs="4">
                                        <Timeline.Item>Số lượng phát hành</Timeline.Item>
                                    </Col>
                                    <Col style={{top: '-0.3rem'}}>
                                        {common.convertTextDecimal(data.SL_DPH)}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="5" xs="4">
                                        <Timeline.Item dot={<Icon type="clock-circle-o" />}>Ngày phát hành</Timeline.Item>
                                    </Col>
                                    <Col style={{top: '-0.3rem'}}>
                                        {common.convertDDMMYYYY(data.NGAYPH)}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="5" xs="4">
                                        <Timeline.Item dot={<Icon type="clock-circle-o" />}>Ngày đáo hạn</Timeline.Item>
                                    </Col>
                                    <Col style={{top: '-0.3rem'}}>
                                        {common.convertDDMMYYYY(data.NGAYDH)}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="5" xs="4">
                                        <Timeline.Item dot={<Icon type="clock-circle-o" />}>Ngày mua</Timeline.Item>
                                    </Col>
                                    <Col style={{top: '-0.3rem'}}>
                                        <DatePicker format={dateFormat} value={this.state.buyDate} onChange={this.updateInputDate('buyDate')} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="5" xs="4">
                                        <Timeline.Item>Số lượng</Timeline.Item>
                                    </Col>
                                    <Col>
                                    <Row style={{top: '-0.3rem'}}>
                                        <Col md="4">
                                            <Input type="number" name="quantityBond" value={this.state.quantityBond} onChange={event => this.updateInputValue(event)} style={{ maxHeight: 32 }} />
                                        </Col>
                                        <Col md="6" className="centerVertical">
                                            <Icon type="swap-right" style={{color: 'green', fontSize: 18}} />&nbsp;&nbsp;&nbsp;<span style={{color: 'red', fontSize: 20}}>{common.convertTextDecimal(this.state.quantityBond * data.GIATRI_HIENTAI)}</span><span style={{fontSize: 12}}>&nbsp;VND</span>
                                        </Col>
                                    </Row>
                                            {this.state.isShowWarning === 1 ? <i style={{ color: 'orange', fontSize: 14 }}>Cần phải nhập số lượng trái phiếu</i> :
                                            this.state.isShowWarning === 4 ? <i style={{ color: 'orange', fontSize: 14 }}>Không tìm thấy tỉ lệ tính lãi suất, liên hệ quản trị viên</i> :
                                            this.state.isShowWarning === 2 ? <i style={{ color: 'orange', fontSize: 14 }}>Số lượng trái phiếu mua không lớn hơn số lượng phát hành</i> :
                                            this.state.isShowWarning === 3 ? <i style={{ color: 'red', fontSize: 14 }}>Tổng tiền đầu tư lớn hơn tài khoản hiện có</i> : null}
                                    </Col>
                                </Row>
                            </Timeline>
                            <Row>
                                <Col md="5" xs="4">
                                    <Timeline pending={this.state.isPending ? "Phí dịch vụ..." : false} reverse={false}>
                                        {!this.state.isPending ? <Timeline.Item color="green" style={{padding: 0}}>Phí dịch vụ ({this.state.feeTrade}%)</Timeline.Item> : null}
                                    </Timeline>
                                </Col>
                                <Col style={{top: '-0.3rem'}}>
                                    <div className="centerVertical">
                                        <span>{common.convertTextDecimal(this.state.quantityBond * data.GIATRI_HIENTAI * (this.state.feeTrade/100))} </span><span style={{fontSize: 12}}>&nbsp;VND</span>
                                    </div>
                                    <Col className="p-top10" style={styles.borderBottomRadiusDasher}></Col>
                                </Col>
                            </Row>

                            <Row style={{top: '-0.3rem'}}>
                                <Col md="5" xs="4">
                                    Tài sản tài khoản hiện có <br/>
                                    <div className="centerVertical">
                                        <span style={{color: 'red', fontSize: 24}}>{common.convertTextDecimal(data.cashBalance.depositAmount)} </span>&nbsp;VND
                                    </div>
                                </Col>
                                <Col md="7" xs="4">
                                    Tổng số tiền đầu tư<br/>
                                    <div className="centerVertical">
                                        <span style={{color: 'red', fontSize: 24}}>{common.convertTextDecimal(this.state.quantityBond * data.GIATRI_HIENTAI * (1 + this.state.feeTrade/100))} </span>&nbsp;VND
                                    </div>
                                </Col>
                            </Row>
                            
                            {/* <div className="right col-xs-12">
                                Tổng số tiền đầu tư <br/>
                                <span style={{color: 'red', fontSize: 24}}>{common.convertTextDecimal(this.state.quantityBond * data.GIATRI_HIENTAI)} VND</span>
                            </div>
                            <div className="left col-xs-12">
                                Tài sản tài khoản hiện có <br/>
                                <span style={{color: 'red', fontSize: 24}}>{common.convertTextDecimal(data.cashBalance.depositAmount)} VND</span>
                            </div> */}
                        </div>
                        <div className="clearfix"></div>
                        <Col style={styles.borderBottom} className="p-top10"></Col>
                        <div className="p-top10">
                            <KeepExpireBond openExpired={this.state.isOpenExpire} onCloseExpired={this.onCloseExpired} onCloseBuyBond={this.toggle} onLoadData={this.onLoadData}
                                data={{
                                        ...data, 
                                        "investMoney": this.state.quantityBond * data.GIATRI_HIENTAI * (1 + this.state.feeTrade/100),
                                        "buyDate": this.state.buyDate,
                                        "quantityBond": this.state.quantityBond,
                                    }}
                            />
                            <SaleBeforeExpire openSaleBeforeExpire={this.state.isOpenSaleBeforeExpire} onCloseSaleExpire={this.onCloseSaleBeforeExpire} onCloseModalBuyBond={this.toggle}/>
                            <i>Lãi suất đầu tư đã tái đầu tư</i>
                            <div className="p-top10">
                                <div className="btnBuyBond" style={styles.noteBond} onClick={this.onOpenKeepExpire}>
                                    <div>
                                        <b style={{fontSize: 18}}>Giữ đến đáo hạn</b><br/>
                                        Lãi suất đầu tư dự kiến {}/năm<br/>
                                        Trong thời gian {} tháng
                                    </div>
                                    <Icon type="right" style={styles.iconNext}/>
                                </div>
                                {/* <div style={Object.assign({}, styles.noteBond, {marginTop: 10})} onClick={this.onOpenSaleBeforeExpire}>
                                    <div>
                                        <b style={{fontSize: 18}}>Bán trước đáo hạn</b><br/>
                                        Lãi suất đầu tư dự kiến từ {}/năm đến {}/năm<br/>
                                        Khi bán trái phiếu sau mỗi tháng
                                    </div>
                                    <Icon type="right" style={styles.iconNext}/>
                                </div> */}
                            </div>
                        </div>
                    </ModalBody>
                </Modal> : null }
            </div>
        )
    }
}

export class KeepExpireBond extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isExpireBondNext: false,
            isActiveOption: 1,
            accountInfo: JSON.parse(localStorage.getItem('accountInfoKey')),
            userInfo: JSON.parse(localStorage.getItem('userInfoKey'))
        }
    }

    toggle = ()=> {
        this.setState({isExpireBondNext: false});
        this.props.onCloseExpired();
    }

    changeOption = (idOption, data)=>{
        this.setState({isActiveOption: idOption});
        if(idOption === 2){
            let tmp = data.map((item, i) => {
                return {
                    ...item,
                    "key": i,
                    "date": common.convertDDMMYYYY(item.date)
                }
            })
            console.log(tmp);
        }
    }

    onNextView = ()=>{
        this.setState({isExpireBondNext: true});
    }

    onPrevView = ()=>{
        this.setState({isExpireBondNext: false});
    }

    onConfirmBuy = async(data, lstTmpDateInterest)=>{
        try {
            const dataTranfer = await lstTmpDateInterest.map((item)=>{
                return{
                    ...item,
                    "moneyReceived": (item.interestRate)*(data.quantityBond * data.MENHGIA)/100
                }
            });

            let dataTmp = {
                "BOND_ID": data.BONDID,
                "MS_NDT": this.state.accountInfo[0].accountNumber,
                "MS_ROOM": data.MSROOM,
                "MS_NGUOI_GT": "MS_01",
                "SOLUONG": data.quantityBond,
                "DONGIA": data.GIATRI_HIENTAI,
                "TONGGIATRI": data.investMoney,
                "LAISUAT_DH": data.LAISUAT_BAN,
                "NGAY_TRAITUC": JSON.stringify(dataTranfer),
                "NGAY_GD": data.buyDate,
            }
            const res = await buyBondsRoomVCSC(dataTmp);
            if(res.error){
                common.notify('error', 'Thao tác thất bại :( ');
            }else{
                common.notify('success', 'Thao tác thành công ^^ ');
                this.toggle();
                this.props.onCloseBuyBond();
                this.props.onLoadData();
            }
        } catch (error) {
            
        }
    }

    render(){
        const data = this.props.data;
        const lstTmpDateInterest = data ? formula.GenDateInterestRate(data.buyDate, data.NGAYPH, data.NGAYDH, data.SONGAYTINHLAI, data.KYHAN, data.LAISUAT_BAN, []) : null;
        let totalMoneyReceive = lstTmpDateInterest ? lstTmpDateInterest.reduce((total, currentValue)=> {
            return total + JSON.parse(currentValue.interestRate);
        }, 0) : null;

        const dataSource = lstTmpDateInterest.map((item, i) =>{
            return {
                ...item,
                "key": i,
                "date": common.convertDDMMYYYY(item.date),
                "totalMoney": `${common.convertTextDecimal(item.interestRate*(data.quantityBond * data.MENHGIA)/100)} (${item.interestRate}%)`
            }
        })

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
            }
        ];

        const columns_2 = [
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
            {
                title: 'Lãi tái đầu tư',
                dataIndex: 'totalMoney_2',
            },
        ];

        const {
            isActiveOption,
            accountInfo,
            userInfo
        } = this.state;
          
        const closeBtn = <button className="close" style={{color: '#000', display: 'block'}} onClick={this.toggle}>&times;</button>;
        
        let Bondprev = data ? (
            <div>
                {/* <Alert color="primary" className="text-center">
                    Thông tin trái phiếu
                </Alert> */}
                <div style={{display: 'flow-root'}}>
                    <div className="left">
                        Ngày mua<br/>
                        Gốc đầu tư
                    </div>
                    <div className="right">
                        {common.convertDDMMYYYY(data.buyDate)}<br/>
                        <div className="centerVertical">
                            <span style={{color: 'red'}}>{common.convertTextDecimal(data.investMoney)}</span> <span style={{fontSize: 10}}>&nbsp;VND</span>
                        </div>
                    </div>
                </div>
                <Row className="p-top10">
                    <Col>
                        <Button style={{width: '100%'}} active={isActiveOption === 1} onClick={()=>this.changeOption(1, [])} outline color="info">Chưa tái đầu tư</Button>
                    </Col>
                    <Col>
                        <Button style={{width: '100%'}} active={isActiveOption === 2} onClick={()=>this.changeOption(2, lstTmpDateInterest)} outline color="danger">Đã tái đầu tư</Button>
                    </Col>
                </Row>
                <div style={{paddingTop: 10, paddingBottom: 10}}>
                    <Tag color="orange">Chi tiết dòng tiền</Tag>
                </div>
                {isActiveOption === 1 ? 
                    <Table 
                        columns={columns} 
                        dataSource={dataSource}
                        bordered={true}
                        pagination={false}
                        size="small" 
                    /> : 
                    <Table 
                        columns={columns_2} 
                        dataSource={this.state.lstData}
                        loading={true}
                        bordered={true}
                        pagination={false}
                        size="small"
                    />
                }

                <div className="p-top10" style={styles.borderBottomRadiusDasher} ></div>
                
                <div className="p-top10">
                    <div style={{display: 'flow-root'}}>
                        <div className="left">Tổng tiền nhận</div>
                        <div className="right centerVertical"><span style={{color: 'red'}}>{common.convertTextDecimal(data.MENHGIA * data.quantityBond * (1 + totalMoneyReceive/100))}</span>  <span style={{fontSize: 10}}>&nbsp;VND</span></div>
                    </div>
                    <div style={{display: 'flow-root'}}>
                        <div className="left">Gốc đầu tư</div>
                        <div className="right centerVertical"><span style={{color: 'red'}}>{common.convertTextDecimal(data.investMoney)}</span> <span style={{fontSize: 10}}>&nbsp;VND</span></div>
                    </div>
                    <div style={{display: 'flow-root'}}>
                        <div className="left">Lãi đầu tư</div>
                        <div className="right">{data.LAISUAT_BAN}(%)</div>
                    </div>
                    <div style={{display: 'flow-root'}}>
                        <div className="left">Cho thời gian</div>
                        <div className="right">{formula.diffMonth(data.NGAYPH, data.NGAYDH)} tháng</div>
                    </div>
                </div>
                <div style={{position: 'relative'}}>
                    <Button color="primary" style={{width: '100%', marginTop: 10}} onClick={this.onNextView}>Bấm để tiếp tục</Button>
                    <Icon type="right" style={styles.iconNext2}/>
                </div>
            </div>
        ) : null;

        let Bondnext = (
            <div>
                <Alert color="primary" className="text-center">
                    Mua trái phiếu
                </Alert>
                <div>
                    <Tag color="#5073a2" style={{ fontSize: 14 }}>Thông tin khách hàng</Tag>
                    <Timeline style={{padding: 5, paddingLeft: 10}}>
                        <Row>
                            <Col sm="5">
                                <Timeline.Item color="green">Tên KH</Timeline.Item>
                            </Col>
                            <Col sm="7">
                                {userInfo.customerName}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="5">
                                <Timeline.Item color="green">CMND/Hộ chiếu</Timeline.Item>
                            </Col>
                            <Col sm="7">
                                {userInfo.identifierNumber}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="5">
                                <Timeline.Item color="green" className="centerVertical" dot={<Icon type="clock-circle-o" />}>Ngày cấp</Timeline.Item>
                            </Col>
                            <Col sm="7">
                                {common.convertDDMMYYYY(common.splitStringDate(userInfo.identifierIssueDate))}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="5">
                                <Timeline.Item color="green">Nơi cấp</Timeline.Item>
                            </Col>
                            <Col sm="7">
                                {userInfo.identifierIssuePlace}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="5">
                                <Timeline.Item color="green">Địa chỉ</Timeline.Item>
                            </Col>
                            <Col sm="7">
                                {userInfo.address}
                            </Col>
                        </Row>
                        {/* <Row style={{padding: '0.3rem'}}>
                            <Col sm="5">
                                <Timeline.Item color="green">SĐT</Timeline.Item>
                            </Col>
                            <Col sm="7">
                                0964666982
                            </Col>
                        </Row> */}
                    </Timeline>
                        <Row style={{paddingLeft: '0.6rem', height: '2vh'}}>
                            <Col sm="5">
                                <Timeline>
                                    <Timeline.Item color="green">Số tài khoản</Timeline.Item>
                                </Timeline>
                            </Col>
                            <Col sm="7">
                                {accountInfo[0].accountNumber}
                            </Col>
                        </Row>
                </div>

                <div className="p-top10">
                    <Tag color="#5073a2">Thông tin đặt mua</Tag>
                    <Timeline style={{padding: 5, paddingLeft: 10}}>
                        <Row>
                            <Col sm="5">
                                <Timeline.Item color="green">Trái phiếu</Timeline.Item>
                            </Col>
                            <Col sm="7">
                                <b style={{color: '#4b81ba'}}>{data.MSTP}</b>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="5">
                                <Timeline.Item color="green">Mệnh giá</Timeline.Item>
                            </Col>
                            <Col sm="7">
                                {common.convertTextDecimal(data.MENHGIA)}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="5">
                                <Timeline.Item color="green">Giá trị hiện tại</Timeline.Item>
                            </Col>
                            <Col sm="7">
                                {common.convertTextDecimal(data.GIATRI_HIENTAI)} VND
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="5">
                                <Timeline.Item color="green" className="centerVertical" dot={<Icon type="clock-circle-o" />}>Ngày phát hành</Timeline.Item>
                            </Col>
                            <Col sm="7">
                                {common.convertDDMMYYYY(data.NGAYPH)}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="5">
                                <Timeline.Item color="green" className="centerVertical" dot={<Icon type="clock-circle-o" />}>Ngày đáo hạn</Timeline.Item>
                            </Col>
                            <Col sm="7">
                                {common.convertDDMMYYYY(data.NGAYDH)}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="5">
                                <Timeline.Item color="green" className="centerVertical" dot={<Icon type="clock-circle-o" />}>Ngày mua</Timeline.Item>
                            </Col>
                            <Col sm="7">
                                {common.convertDDMMYYYY(data.buyDate)}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="5">
                                <Timeline.Item color="green">Số lượng đặt mua</Timeline.Item>
                            </Col>
                            <Col sm="7">
                                {data.quantityBond}
                            </Col>
                        </Row>
                    </Timeline>
                    <Row style={{paddingLeft: '0.6rem', height: '2vh'}}>
                        <Col sm="5">
                            <Timeline>
                                <Timeline.Item color="green">Giá mua</Timeline.Item>
                            </Timeline>
                        </Col>
                        <Col sm="7" style={{ color: 'red' }}>
                            <span style={{color: 'red'}}>{common.convertTextDecimal(data.investMoney)}</span> VND
                        </Col>
                    </Row>
                </div>

                <Row style={{ paddingTop: 20 }}>
                    <Col sm="6">
                        <div style={{ position: 'relative' }}>
                            <Button style={{ width: '100%' }} outline color="secondary" onClick={this.onPrevView}>Quay lại</Button>
                            <Icon type="double-left" style={styles.iconPrev3} />
                        </div>
                    </Col>
                    <Col sm="6">
                        <div style={{ position: 'relative' }}>
                            <Button style={{ width: '100%' }} outline color="success" onClick={()=>this.onConfirmBuy(data, lstTmpDateInterest)}>Xác nhận</Button>
                            <Icon type="double-right" style={styles.iconNext3} />
                        </div>
                    </Col>
                </Row>
            </div>
        );
        return(
            <Modal isOpen={this.props.openExpired} size="lg" centered>
                <ModalHeader close={closeBtn} style={{backgroundColor: 'rgba(155, 183, 205, 0.48)'}}>Giữ đến đáo hạn</ModalHeader>
                <ModalBody>
                    {this.state.isExpireBondNext === true ? Bondnext : Bondprev }
                </ModalBody>
            </Modal>
        )
    }
}

export class SaleBeforeExpire extends Component{
    toggle = ()=> {
        this.props.onCloseSaleExpire();
        this.props.onCloseModalBuyBond();
        messSuccess();
    }

    render(){
        const closeBtn = <button className="close" style={{color: '#000', display: 'block'}} onClick={this.toggle}>&times;</button>;
        return(
            <div>
                <Modal isOpen={this.props.openSaleBeforeExpire} toggle={this.toggle} size="lg" centered>
                    <ModalHeader close={closeBtn} style={{background: 'rgba(155, 183, 205, 0.48)'}}>Bán trước đáo hạn</ModalHeader>
                    <ModalBody>
                        <Alert color="success" className="text-center">
                            Thông tin IBONDS-VCSC-NHN2020
                        </Alert>
                        <Badge color="primary">Ngày mua: 22/05/2019</Badge>&nbsp;&nbsp;<Badge color="danger">gốc đầu tư: 1,0000,000</Badge>
                        <Tabs>
                            <TabPane tab="Giữ đến đáo hạn" key="1">
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
                            </TabPane>
                            <TabPane tab="Bán trước đáo hạn" key="2">
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
                            </TabPane>
                        </Tabs>
                        <div className="p-top10">
                            <div style={{color: 'red'}}>* Lưu ý</div>
                            <span>Lợi tức hiện tại có thể dùng để so sánh thu nhập lãi của trái phiếu với thu nhập cổ tức của cổ phiếu. Nó được tính bằng cách chia  lượng trái tức hàng năm theo giá hiện hành của trái phiếu. Hãy nhớ rằng lợi tức này chỉ là một phần lợi nhuận thu nhập, không tính khoản thu vốn hoặc lỗ có thể phát sinh. Như vậy, với các nhà đầu tư chỉ quan tâm đến thu nhập hiện tại, lợi nhuận này là hữu ích nhất.</span>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Mua trái phiếu</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const styles = {
    borderBottom: {
        borderBottom: '1px solid #d9d9d9'
    },
    noteBond:{
        padding: 10,
        background: 'linear-gradient(to left, #5f2c82, #49a09d)',
        width: '100%',
        borderRadius: 3,
        boxShadow: '0 5px 6px rgba(0,0,0,0.23)',
        position: 'relative',
        color: '#fff',
        cursor: 'pointer'
    },
    iconNext:{
        position: 'absolute', 
        right: '1rem', 
        top: '2.5rem', 
        color: '#fff'
    },
    iconNext2:{
        position: 'absolute',
        right: '1rem',
        top: '1.4rem',
        color: '#fff'
    },
    iconNext3:{
        position: 'absolute',
        right: '1rem',
        top: '0.7rem',
        color: '#fff'
    },
    iconPrev3:{
        position: 'absolute', 
        left: '1rem',
        top: '0.7rem',
        color: '#fff'
    },
    borderBottomRadius:{
        borderBottom: '1px solid #f0f3f5'
    },
    borderBottomRadiusDasher:{
        borderBottom: '1px dashed #f0f3f5'
    },
    headerDetailBond:{
        padding: 10,
        color: '#fff',
        maxHeight: '100%',
        backgroundColor: '#5073a2',
        marginTop: 15
    },
}
