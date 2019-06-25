import React, {Component} from 'react';
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Input, 
    Row, 
    Col,
    Table,
    Badge,
    Alert
} from 'reactstrap';
import { DatePicker, Icon, Tabs, message, Tag } from 'antd';
import moment from 'moment';
import * as common from '../Common/Common';
import * as formula from '../Common/Formula';
import {buyBondsRoomVCSC} from '../../api/api';
const TabPane = Tabs.TabPane;
const dateFormat = 'DD/MM/YYYY';
const messSuccess = () => {
    message.success('Thao tác thành công !!!');
};

export class ModalBuyBond extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isOpenExpire: false,
            isOpenSaleBeforeExpire: false,
            quantityBond: 0,
            buyDate: moment(new Date(), dateFormat)
        }
    }

    toggle = ()=> {
        this.props.onClose();
    }

    onOpenKeepExpire = ()=>{
        this.setState({isOpenExpire: true});
    }

    onCloseExpired = ()=>{
        this.setState({isOpenExpire: false});
    }

    updateInputValue = (event)=>{
        this.setState({[event.target.name]: event.target.value});
    }

    updateInputDate = name => (value)=>{
        this.setState({[name]: value});
    }

    onOpenSaleBeforeExpire = ()=>{
        this.setState({isOpenSaleBeforeExpire: true});
    }

    onCloseSaleBeforeExpire = ()=>{
        this.setState({isOpenSaleBeforeExpire: false});
    }

    render() {
        const data = this.props.data;
        const closeBtn = <button className="close" style={{color: '#000', display: 'block'}} onClick={this.toggle}>&times;</button>;
        return (
            <div>
                {data ? <Modal isOpen={this.props.open} toggle={this.toggle} size="lg" centered>
                    <ModalHeader close={closeBtn} style={{backgroundColor: 'rgba(155, 183, 205, 0.48)'}}>Mua trái phiếu</ModalHeader>
                    <ModalBody>
                        <div>
                            <Row>
                                <Col>
                                    Mệnh giá
                                </Col>
                                <Col>
                                    {common.convertTextDecimal(data.MENHGIA)} VND
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Giá trị hiện tại
                                </Col>
                                <Col>
                                    <Tag color="volcano" style={{fontSize: 16}}>{common.convertTextDecimal(data.GIATRI_HIENTAI)}</Tag> VND
                                </Col>
                            </Row>
                            <Row className="p-top10">
                                <Col>
                                    Ngày phát hành
                                </Col>
                                <Col>
                                    {common.convertDDMMYYYY(data.NGAYPH)}
                                </Col>
                            </Row>
                            <Row className="p-top10">
                                <Col>
                                    Ngày đáo hạn
                                </Col>
                                <Col>
                                    {common.convertDDMMYYYY(data.NGAYDH)}
                                </Col>
                            </Row>
                            <Row className="p-top10">
                                <Col>
                                    Ngày mua
                                </Col>
                                <Col>
                                    <DatePicker format={dateFormat} value={this.state.buyDate} onChange={this.updateInputDate('buyDate')}/>
                                </Col>
                            </Row>
                            <Row className="p-top10">
                                <Col>
                                    Số lượng
                                </Col>
                                <Col>
                                    <Input type="number" name="quantityBond" value={this.state.quantityBond} onChange={event => this.updateInputValue(event)} style={{maxHeight: 34}}/>
                                </Col>
                            </Row>
                            <div className="right p-top10">
                                Tổng số tiền đầu tư <br/>
                                <span style={{color: 'red', fontSize: 24}}>{common.convertTextDecimal(this.state.quantityBond * data.GIATRI_HIENTAI)} VND</span>
                            </div>
                            <div className="left p-top10">
                                Tài sản hiện có <br/>
                                <span style={{color: 'red', fontSize: 24}}>{common.convertTextDecimal(data.cashBalance.depositAmount)} VND</span>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                        <Col style={styles.borderBottom} className="p-top10"></Col>
                        <div className="p-top10">
                            <KeepExpireBond openExpired={this.state.isOpenExpire} onCloseExpired={this.onCloseExpired} 
                                data={{
                                        ...data, 
                                        "investMoney": this.state.quantityBond * data.GIATRI_HIENTAI,
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
                        <div>
                            <Row style={{padding: '1rem'}}>
                                <Col sm="4">
                                    Tổ chức phát hành
                                </Col>
                                <Col sm="8" style={{color: 'red'}}>
                                    <Tag color="volcano" style={{fontSize: 16}}>{data.TEN_DN}</Tag>
                                </Col>
                            </Row>
                            <div style={styles.borderBottomRadius}></div>
                            <Row className="p-top10" style={{padding: '1rem'}}>
                                <Col sm="4">
                                    Đăng kí kinh doanh
                                </Col>
                                <Col sm="8">
                                    {data.MSDN}
                                </Col>
                            </Row>
                            <div style={styles.borderBottomRadius}></div>
                            <Row className="p-top10" style={{padding: '1rem'}}>
                                <Col sm="4">
                                    Loại trái phiếu
                                </Col>
                                <Col sm="8">
                                    <Tag color="geekblue" style={{fontSize: 16}}>{data.TENLOAI_TP}</Tag>
                                </Col>
                            </Row>
                            <div style={styles.borderBottomRadius}></div>
                            <Row className="p-top10" style={{padding: '1rem'}}>
                                <Col sm="4">
                                    Mệnh giá
                                </Col>
                                <Col sm="8">
                                    <span>{common.convertTextDecimal(data.MENHGIA)}</span> VND
                                </Col>
                            </Row>
                            <div style={styles.borderBottomRadius}></div>
                            <Row className="p-top10" style={{padding: '1rem'}}>
                                <Col sm="4">
                                    Giá trị hiện tại
                                </Col>
                                <Col sm="8">
                                    <span style={{color: 'red'}}>{common.convertTextDecimal(data.GIATRI_HIENTAI)}</span> VND
                                </Col>
                            </Row>
                            <div style={styles.borderBottomRadius}></div>
                            <Row className="p-top10" style={{padding: '1rem'}}>
                                <Col sm="4">
                                    Lãi suất PH
                                </Col>
                                <Col sm="8">
                                    <span style={{color: 'red'}}>{data.LAISUAT_HH}</span>(%)
                                </Col>
                            </Row>
                            <div style={styles.borderBottomRadius}></div>
                            <Row className="p-top10" style={{padding: '1rem'}}>
                                <Col sm="4">
                                    Ngày phát hành
                                </Col>
                                <Col sm="8">
                                    {common.convertDDMMYYYY(data.NGAYPH)}
                                </Col>
                            </Row>
                            <div style={styles.borderBottomRadius}></div>
                            <Row className="p-top10" style={{padding: '1rem'}}>
                                <Col sm="4">
                                    Ngày đáo hạn
                                </Col>
                                <Col sm="8">
                                    {common.convertDDMMYYYY(data.NGAYDH)}
                                </Col>
                            </Row>
                            <div style={styles.borderBottomRadius}></div>
                            <Row className="p-top10" style={{padding: '1rem'}}>
                                <Col sm="4">
                                    Thanh toán gốc và lãi
                                </Col>
                                <Col sm="8">
                                    Lãi trả <span style={{color: 'red'}}>{data.LOAI_TT}</span> tháng/lần, gốc trả cuối kì
                                </Col>
                            </Row>
                            <div style={styles.borderBottomRadius}></div>
                            <Row className="p-top10" style={{padding: '1rem'}}>
                                <Col sm="4">
                                    Trạng thái
                                </Col>
                                <Col sm="8">
                                    {data.TRANGTHAI === 1 ? <span style={{color: 'green'}}>Đang niêm yết</span> : <span style={{color: '#f46f02'}}>Không còn niêm yết</span>}
                                </Col>
                            </Row>
                        </div>
                        <Col style={styles.borderBottom} className="p-top10"></Col>
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

export class KeepExpireBond extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isExpireBondNext: false,
            accountInfo: JSON.parse(localStorage.getItem('accountInfoKey'))
        }
    }

    toggle = ()=> {
        this.setState({isExpireBondNext: false});
        this.props.onCloseExpired();
    }

    onNextView = ()=>{
        this.setState({isExpireBondNext: true});
    }

    onPrevView = ()=>{
        this.setState({isExpireBondNext: false});
    }

    onConfirmBuy = async(data, lstTmpDateInterest)=>{
        try {
            let interestRateExpired = JSON.stringify(lstTmpDateInterest);
            let dataTmp = {
                "BOND_ID": data.BONDID,
                "MS_NDT": "311819634",
                "MS_ROOM": data.MSROOM,
                "MS_NGUOI_GT": "MS_01",
                "SOLUONG": data.quantityBond,
                "DONGIA": data.GIATRI_HIENTAI,
                "TONGGIATRI": data.investMoney,
                "LAISUAT_DH": data.LAISUAT_HH,
                "NGAY_DH": data.NGAYDH,
                "NGAY_TRAITUC": interestRateExpired,
                "NGAY_GD": data.buyDate,
            }
            const res = await buyBondsRoomVCSC(dataTmp);
            if(res.error){
                common.notify('error', 'Thao tác thất bại :( ');
            }else{
                common.notify('success', 'Thao tác thành công ^^ ');
                this.toggle();
            }
        } catch (error) {
            
        }
    }

    render(){
        const data = this.props.data;
        const lstTmpDateInterest = data ? formula.GenDateInterestRate(data.buyDate, data.NGAYPH, data.NGAYDH, data.SONGAYTINHLAI, data.KYHAN, data.LAISUAT_HH, []) : null;
        let totalMoneyReceive = lstTmpDateInterest ? lstTmpDateInterest.reduce((total, currentValue)=> {
            return total + JSON.parse(currentValue.interestRate);
        }, 0) : null;
          
        const closeBtn = <button className="close" style={{color: '#000', display: 'block'}} onClick={this.toggle}>&times;</button>;
        let Bondprev = data ? (
            <div>
                <Alert color="primary" className="text-center">
                    Thông tin trái phiếu
                </Alert>
                <div style={{display: 'flow-root'}}>
                    <div className="left">
                        Ngày mua<br/>
                        Gốc đầu tư
                    </div>
                    <div className="right">
                        {common.convertDDMMYYYY(data.buyDate)}<br/>
                        <span style={{color: 'red'}}>{common.convertTextDecimal(data.investMoney)}</span> VND
                    </div>
                </div>
                <Row className="p-top10">
                    <Col>
                        <Button style={{width: '100%'}} outline color="info">Chưa tái đầu tư</Button>
                    </Col>
                    {/* <Col>
                        <Button style={{width: '100%'}} outline color="danger">Đã tái đầu tư</Button>
                    </Col> */}
                </Row>
                <div style={styles.headerDetailBond}>Chi tiết dòng tiền</div>
                <Table bordered>
                    <thead>
                    <tr>
                        <th>Nội dung</th>
                        <th>Ngày nhận</th>
                        <th>Tiền nhận (VND)</th>
                    </tr>
                    </thead>
                    <tbody>
                        {lstTmpDateInterest.map((item, index)=>
                            <tr key={index}>
                                <td>Coupon</td>
                                <td>{common.convertDDMMYYYY(item.date)}</td>
                                <td>{common.convertTextDecimal(item.interestRate*(data.investMoney)/100)} ({item.interestRate}%)</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <div>
                    <div style={{display: 'flow-root'}}>
                        <div className="left">Tổng tiền nhận</div>
                        <div className="right"><span style={{color: 'red'}}>{common.convertTextDecimal(data.investMoney + data.investMoney*totalMoneyReceive/100)}</span> VND</div>
                    </div>
                    <div style={{display: 'flow-root'}}>
                        <div className="left">Gốc đầu tư</div>
                        <div className="right">{common.convertTextDecimal(data.investMoney)}</div>
                    </div>
                    <div style={{display: 'flow-root'}}>
                        <div className="left">Lãi đầu tư</div>
                        <div className="right">{totalMoneyReceive}(%)</div>
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
                    <Badge color="primary" style={{ fontSize: 14 }}>Thông tin khách hàng</Badge>
                    <Row>
                        <Col sm="5">
                            Tên KH
                        </Col>
                        <Col sm="7">
                            {this.state.accountInfo[0].accountName}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="5">
                            CMND/Hộ chiếu
                        </Col>
                        <Col sm="7">
                            1747237290
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="5">
                            Ngày cấp
                        </Col>
                        <Col sm="7">
                            28/05/2012
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="5">
                            Nơi cấp
                                </Col>
                        <Col sm="7">
                            Công an Thanh Hóa
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="5">
                            Địa chỉ
                        </Col>
                        <Col sm="7">
                            Số 2, Lê Văn Huân, Tân Bình, Tp.HCM
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="5">
                            SĐT
                        </Col>
                        <Col sm="7">
                            0964666982
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="5">
                            Số tài khoản
                                </Col>
                        <Col sm="7">
                            {this.state.accountInfo[0].accountNumber}
                        </Col>
                    </Row>
                </div>

                <div className="p-top10">
                    <Badge color="primary" style={{ fontSize: 14 }}>Thông tin đặt mua</Badge>
                    <Row>
                        <Col sm="5">
                            Trái phiếu
                        </Col>
                        <Col sm="7">
                            {data.TENLOAI_TP}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="5">
                            Mệnh giá
                        </Col>
                        <Col sm="7">
                            {common.convertTextDecimal(data.MENHGIA)}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Giá trị hiện tại
                        </Col>
                        <Col>
                            {common.convertTextDecimal(data.GIATRI_HIENTAI)} VND
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="5">
                            Ngày phát hành
                        </Col>
                        <Col sm="7">
                            {common.convertDDMMYYYY(data.NGAYPH)}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="5">
                            Ngày đáo hạn
                        </Col>
                        <Col sm="7">
                            {common.convertDDMMYYYY(data.NGAYDH)}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="5">
                            Ngày mua
                        </Col>
                        <Col sm="7">
                            {common.convertDDMMYYYY(data.buyDate)}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="5">
                            Số lượng đặt mua
                        </Col>
                        <Col sm="7">
                            {data.quantityBond}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="5">
                            Giá mua
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
        borderBottom: '1px solid #e2e4ea'
    },
    headerDetailBond:{
        padding: 10,
        color: '#fff',
        maxHeight: '100%',
        backgroundColor: '#40a9ff',
        marginTop: 15
    },
}
