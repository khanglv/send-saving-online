import React, {Component} from 'react';
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Row, 
    Col,
    Alert
} from 'reactstrap';
import { DatePicker, Icon, Tag , Timeline, Input, Table} from 'antd';
import {debounce} from 'lodash';
import moment from 'moment';
import * as common from '../Common/Common';
import * as formula from '../Common/Formula';
import {buyBondsRoomVCSC, getListFeeTrade, getListInterestRetunTrade} from '../../api/api';
const dateFormat = 'DD/MM/YYYY';

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
        this.setState({ [event.target.name]: event.target.value, isShowWarning: 0 });
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
                this.setState({ feeTrade: res.TYLETINH});
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
                                            this.state.isShowWarning === 4 ? <i style={{ color: 'orange', fontSize: 14 }}>Không tìm thấy lãi suất tính phí dịch vụ, liên hệ quản trị viên</i> :
                                            this.state.isShowWarning === 2 ? <i style={{ color: 'orange', fontSize: 14 }}>Số lượng trái phiếu mua không lớn hơn số lượng phát hành</i> :
                                            this.state.isShowWarning === 3 ? <i style={{ color: 'red', fontSize: 14 }}>Tổng tiền đầu tư lớn hơn tài khoản hiện có</i> : null}
                                    </Col>
                                </Row>
                            </Timeline>
                            <Row>
                                <Col md="5" xs="4">
                                    <Timeline pending={this.state.isPending ? "Phí dịch vụ..." : false} reverse={false}>
                                        {!this.state.isPending ? <Timeline.Item color={this.state.feeTrade > 0 ? "green" : 'orange' } style={{padding: 0}}>Phí dịch vụ ({this.state.feeTrade}%)</Timeline.Item> : null}
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
                        </div>
                        <div className="clearfix"></div>
                        <Col style={styles.borderBottom} className="p-top10"></Col>
                        <div className="p-top10">
                            <KeepExpireBond openExpired={this.state.isOpenExpire} onCloseExpired={this.onCloseExpired} onCloseBuyBond={this.toggle} onLoadData={this.onLoadData}
                                data={{
                                        ...data,
                                        "moneyBuy": this.state.quantityBond * data.GIATRI_HIENTAI,
                                        "investMoney": this.state.quantityBond * data.GIATRI_HIENTAI * (1 + this.state.feeTrade/100),
                                        "buyDate": this.state.buyDate,
                                        "feeTrade": this.state.quantityBond * data.GIATRI_HIENTAI * (this.state.feeTrade/100),
                                        "quantityBond": this.state.quantityBond,
                                    }}
                            />
                            <SaleBeforeExpire openSaleBeforeExpire={this.state.isOpenSaleBeforeExpire} onCloseSaleExpire={this.onCloseSaleBeforeExpire} onCloseModalBuyBond={this.toggle}
                                data={{
                                    ...data,
                                    "moneyBuy": this.state.quantityBond * data.GIATRI_HIENTAI,
                                    "investMoney": this.state.quantityBond * data.GIATRI_HIENTAI * (1 + this.state.feeTrade/100),
                                    "buyDate": this.state.buyDate,
                                    "quantityBond": this.state.quantityBond,
                                }}
                            />
                            <i>Lãi suất đầu tư đã tái đầu tư</i>
                            <div className="p-top10">
                                <div className="btnBuyBond" style={styles.noteBond} onClick={this.onOpenKeepExpire}>
                                    <div>
                                        <b style={{fontSize: 18}}>Giữ đến đáo hạn</b><br/>
                                        Lãi suất đầu tư dự kiến {data.LAISUAT_BAN}/năm<br/>
                                        Trong thời gian {formula.diffMonth(data.NGAYPH, data.NGAYDH)} tháng
                                    </div>
                                    <Icon type="right" style={styles.iconNext}/>
                                </div>
                                <div className="btnBuyBond" style={Object.assign({}, styles.noteBond, {marginTop: 10})} onClick={this.onOpenSaleBeforeExpire}>
                                    <div>
                                        <b style={{fontSize: 18}}>Bán trước đáo hạn</b><br/>
                                        Lãi suất đầu tư dự kiến từ {}/năm đến {}/năm<br/>
                                        Khi bán trái phiếu sau mỗi tháng
                                    </div>
                                    <Icon type="right" style={styles.iconNext}/>
                                </div>
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
            isLoadingTable: false,
            dataInterestReturn: [],
            interestReturn: null,
            accountInfo: JSON.parse(localStorage.getItem('accountInfoKey')),
            userInfo: JSON.parse(localStorage.getItem('userInfoKey'))
        }
    }

    toggle = ()=> {
        this.setState({isExpireBondNext: false});
        this.props.onCloseExpired();
    }

    changeOption = async(idOption, dataTake)=>{
        this.setState({isActiveOption: idOption});
        if(idOption === 2){
            this.setState({ isLoadingTable: true });
            try {
                const res = await getListInterestRetunTrade(this.props.data.BONDID);
                this.setState({ isLoadingTable: false });
                if (!res.error) {
                    const dataLoad = this.props.data;
                    let returnTmp = 0;
                    let tmp_2 =  dataTake.map((item, i)=>{
                        if(i === 0){
                            returnTmp = item.totalDay*dataLoad.LAISUAT_BAN*dataLoad.moneyBuy/(100* dataLoad.SONGAYTINHLAI);
                            return {
                                ...item,
                                "key": i,
                                "date": common.convertDDMMYYYY(item.date),
                                "totalMoney": common.convertTextDecimal(item.totalDay*dataLoad.LAISUAT_BAN*dataLoad.moneyBuy/(100* dataLoad.SONGAYTINHLAI)),
                                "returnReal": item.totalDay*dataLoad.LAISUAT_BAN*dataLoad.moneyBuy/(100* dataLoad.SONGAYTINHLAI),
                                "return": common.convertTextDecimal(item.totalDay*dataLoad.LAISUAT_BAN*dataLoad.moneyBuy/(100* dataLoad.SONGAYTINHLAI))
                            }
                        }else{
                            let result = returnTmp*(1 + res.LS_TOIDA*item.totalDay/(100*dataLoad.SONGAYTINHLAI)) + item.totalDay*dataLoad.LAISUAT_BAN*dataLoad.moneyBuy/(100* dataLoad.SONGAYTINHLAI);
                            returnTmp = result;
                            return{
                                ...item,
                                "key": i,
                                "date": common.convertDDMMYYYY(item.date),
                                "totalMoney": common.convertTextDecimal(item.totalDay*dataLoad.LAISUAT_BAN*dataLoad.moneyBuy/(100* dataLoad.SONGAYTINHLAI)),
                                "returnReal": result ? result : 0,
                                "return": common.convertTextDecimal(result)
                            }
                        }
                    });
                    this.setState({dataInterestReturn: tmp_2, interestReturn: res.LS_TOIDA});
                } else {
                    common.notify("error", "Thao tác thất bại" + res.error);
                }
            } catch (error) {
                this.setState({ isLoadingTable: false });
                common.notify("error", "Thao tác thất bại");
            }
        }
        if(idOption === 1){
            this.setState({interestReturn: null});
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
            const dataTranfer = this.state.isActiveOption === 1 ? await lstTmpDateInterest.map((item)=>{
                return{
                    ...item,
                    "interestRate": data.LAISUAT_BAN,
                    "interestRateReturn": this.state.interestReturn ? this.state.interestReturn : 0,
                    "moneyReceived": item.totalDay*data.LAISUAT_BAN*data.moneyBuy/(100* data.SONGAYTINHLAI)
                }
            }) : this.state.dataInterestReturn.map(item => {
                return {
                    ...item,
                    "date": common.convertToFormat(item.date),
                    "interestRate": this.state.interestReturn ? this.state.interestReturn : 0,
                    "moneyReceived": item.returnReal
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
                "TRANGTHAI_MUA": this.state.isActiveOption,
                "TONGGIATRITRUOCPHI": data.moneyBuy
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
        const lstTmpDateInterest = data ? formula.GenDateInterestRate(data.buyDate, data.NGAYPH, data.NGAYDH, data.KYHAN, []) : null;

        const dataSource = lstTmpDateInterest.map((item, i) =>{
            return {
                ...item,
                "key": i,
                "date": common.convertDDMMYYYY(item.date),
                "totalMoneyReal": item.totalDay*data.LAISUAT_BAN*data.moneyBuy/(100* data.SONGAYTINHLAI),
                "totalMoney": common.convertTextDecimal(item.totalDay*data.LAISUAT_BAN*data.moneyBuy/(100* data.SONGAYTINHLAI))
            }
        });

        const {
            isActiveOption,
            accountInfo,
            userInfo,
            dataInterestReturn,
            interestReturn
        } = this.state;

        let totalMoneyReceive = isActiveOption === 1 ? (dataSource ? dataSource.reduce((total, currentValue) => {
            return total + parseFloat(currentValue.totalMoneyReal);
        }, 0) : null) : interestReturn ? (dataInterestReturn.length > 0 ? dataInterestReturn[dataInterestReturn.length-1].returnReal : 0) : 0;

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
                title: 'Lợi tức chưa đầu tư',
                dataIndex: 'totalMoney',
            },
            {
                title: 'Lợi tức tái đầu tư',
                dataIndex: 'return',
            },
        ];
          
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
                    <Tag color="orange">Chi tiết dòng tiền</Tag> {isActiveOption === 2 ? interestReturn === undefined ? <div className="text-center" style={{color: 'red'}}>Trái phiếu chưa nhập lãi suất tái đầu tư. Vui lùng liên hệ quản trị viên!!!</div> : null : null}
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
                        dataSource={this.state.dataInterestReturn}
                        loading={this.state.isLoadingTable}
                        bordered={true}
                        pagination={false}
                        size="small"
                    />
                }

                <div className="p-top10" style={styles.borderBottomRadiusDasher} ></div>
                
                <div className="p-top10">
                    <div style={{display: 'flow-root'}}>
                        <div className="left">Tổng tiền nhận</div>
                        <div className="right centerVertical"><span style={{color: 'red'}}>{common.convertTextDecimal(totalMoneyReceive + data.GIATRI_HIENTAI*data.quantityBond)}</span> <span style={{fontSize: 10}}>&nbsp;VND</span></div>
                    </div>
                    <div style={{display: 'flow-root'}}>
                        <div className="left">Gốc đầu tư</div>
                        <div className="right centerVertical"><span style={{color: 'red'}}>{common.convertTextDecimal(data.investMoney)}</span> <span style={{fontSize: 10}}>&nbsp;VND</span></div>
                    </div>
                    <div style={{display: 'flow-root'}}>
                        <div className="left">Lãi đầu tư</div>
                        <div className="right">{data.LAISUAT_BAN}(%)</div>
                    </div>
                    {interestReturn ? <div style={{display: 'flow-root'}}>
                        <div className="left">Lãi tái đầu tư</div>
                        <div className="right">{interestReturn}(%)</div>
                    </div> : null}
                    <div style={{display: 'flow-root'}}>
                        <div className="left">Cho thời gian</div>
                        <div className="right">{formula.diffMonth(data.NGAYPH, data.NGAYDH)} tháng</div>
                    </div>
                </div>
                <div style={{position: 'relative'}}>
                    <Button color="primary" style={{width: '100%', marginTop: 10}} onClick={this.onNextView}
                        disabled={interestReturn === undefined && isActiveOption === 2}
                    >
                        Bấm để tiếp tục
                    </Button>
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
                        <Row>
                            <Col sm="5">
                                <Timeline.Item color="green">Tổng đầu tư</Timeline.Item>
                            </Col>
                            <Col sm="7">
                                {common.convertTextDecimal(data.moneyBuy)}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="5">
                                <Timeline.Item color="green">Phí giao dịch</Timeline.Item>
                            </Col>
                            <Col sm="7">
                                {common.convertTextDecimal(data.feeTrade)}
                            </Col>
                        </Row>
                    </Timeline>
                    <Row style={{paddingLeft: '0.6rem', height: '2vh'}}>
                        <Col sm="5">
                            <Timeline>
                                <Timeline.Item color="green">Tiền cần thanh toán</Timeline.Item>
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
        // this.props.onCloseModalBuyBond();
    }

    render(){
        const closeBtn = <button className="close" style={{color: '#000', display: 'block'}} onClick={this.toggle}>&times;</button>;
        const data = this.props.data;
        const columns = [
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

        const dataSource = [];

        return(
            <div>
                <Modal isOpen={this.props.openSaleBeforeExpire} toggle={this.toggle} size="lg" centered>
                    <ModalHeader close={closeBtn} style={{background: 'rgba(155, 183, 205, 0.48)'}}>Bán trước đáo hạn</ModalHeader>
                    <ModalBody>
                        <Alert color="success" className="text-center">
                            {data.MSTP}
                        </Alert>
                        <span>
                            <i>Đáo hạn:</i> <span className="index-color">{common.convertDDMMYYYY(data.NGAYDH)}</span> <i>- Tổ chức phát hành:</i> <span className="index-color">{data.TEN_DN}</span>
                        </span>
                        <div className="centerVertical">
                            <i>Ngày mua:</i>&nbsp;<span>{common.convertDDMMYYYY(data.buyDate)}</span>&nbsp;-&nbsp;
                            <i>Tổng đầu tư:</i>&nbsp;<span style={{color: 'red'}}>{common.convertTextDecimal(data.investMoney)}</span> <span style={{fontSize: 10}}>&nbsp;VND</span>
                        </div>
                        <div className="p-top10">
                            <Table 
                                columns={columns} 
                                dataSource={dataSource}
                                bordered={true}
                                pagination={false}
                                size="small" 
                            />
                        </div>
                        <div className="p-top10" style={styles.borderBottomRadiusDasher}></div>
                        <div style={{fontSize: 13, paddingTop: 10}}>
                            <i>Thuật ngữ: &nbsp;</i><span className="index-color">TĐT</span> - Tái đầu tư
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
