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
import { DatePicker, Icon, Tabs, message } from 'antd';
import moment from 'moment';

const TabPane = Tabs.TabPane;
const dateFormat = 'DD/MM/YYYY';
const messSuccess = () => {
    message.success('Thao tác thành công !!!');
};
const messFailed = () => {
    message.error('Thao tác thất bại :( ');
};

export class ModalBuyBond extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isOpenExpire: false,
            isOpenSaleBeforeExpire: false
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
                <Modal isOpen={this.props.open} toggle={this.toggle} size="lg" centered>
                    <ModalHeader close={closeBtn} style={{backgroundColor: 'rgba(155, 183, 205, 0.48)'}}>Mua trái phiếu</ModalHeader>
                    <ModalBody>
                        <div>
                            <p style={{color: 'red', fontSize: 18}}>{data.MS_DN}</p>
                            <Row>
                                <Col>
                                    Mệnh giá
                                </Col>
                                <Col>
                                    {parseInt(data.MENHGIA).toLocaleString(undefined, {maximumFractionDigits:2})} VND
                                </Col>
                            </Row>
                            <Row className="p-top10">
                                <Col>
                                    Ngày phát hành
                                </Col>
                                <Col>
                                    20/05/2019
                                </Col>
                            </Row>
                            <Row className="p-top10">
                                <Col>
                                    Ngày đáo hạn
                                </Col>
                                <Col>
                                    20/05/2020
                                </Col>
                            </Row>
                            <Row className="p-top10">
                                <Col>
                                    Ngày mua
                                </Col>
                                <Col>
                                    <DatePicker defaultValue={moment(new Date(), dateFormat)} format={dateFormat} />
                                </Col>
                            </Row>
                            <Row className="p-top10">
                                <Col>
                                    Số lượng
                                </Col>
                                <Col>
                                    <Input type="number" id="exampleCity" style={{maxHeight: 34}}/>
                                </Col>
                            </Row>
                            <div className="right p-top10">
                                Tổng số tiền đầu tư <br/>
                                <span style={{color: 'red', fontSize: 24}}>{parseInt(data.MENHGIA).toLocaleString(undefined, {maximumFractionDigits:2})} VND</span>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                        <Col style={styles.borderBottom} className="p-top10"></Col>
                        <div className="p-top10">
                            <KeepExpireBond openExpired={this.state.isOpenExpire} onCloseExpired={this.onCloseExpired}/>
                            <SaleBeforeExpire openSaleBeforeExpire={this.state.isOpenSaleBeforeExpire} onCloseSaleExpire={this.onCloseSaleBeforeExpire} onCloseModalBuyBond={this.toggle}/>
                            <i>Lãi suất đầu tư đã tái đầu tư</i>
                            <div className="p-top10">
                                <div style={styles.noteBond} onClick={this.onOpenKeepExpire}>
                                    <div>
                                        <b style={{fontSize: 18}}>Giữ đến đáo hạn</b><br/>
                                        Lãi suất đầu tư dự kiến {}/năm<br/>
                                        Trong thời gian {} tháng
                                    </div>
                                    <Icon type="right" style={styles.iconNext}/>
                                </div>
                                <div style={Object.assign({}, styles.noteBond, {marginTop: 10})} onClick={this.onOpenSaleBeforeExpire}>
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
                </Modal>
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
                <Modal isOpen={this.props.openDetail} toggle={this.toggle} size="lg" centered>
                    <ModalHeader style={{background: '#bac7df'}}>Thông tin trái phiếu</ModalHeader>
                    <ModalBody>
                        <div>
                            <Row>
                                <Col sm="4">
                                    Tổ chức phát hành
                                </Col>
                                <Col sm="8" style={{color: 'red'}}>
                                    {data.MS_DN}
                                </Col>
                            </Row>
                            <div style={styles.borderBottomRadius}></div>
                            <Row className="p-top10">
                                <Col sm="4">
                                    Đăng kí kinh doanh
                                </Col>
                                <Col sm="8">
                                    {data.SO_HD}
                                </Col>
                            </Row>
                            <div style={styles.borderBottomRadius}></div>
                            <Row className="p-top10">
                                <Col sm="4">
                                    Loại trái phiếu
                                </Col>
                                <Col sm="8">
                                    {data.TT_TRAIPHIEU}
                                </Col>
                            </Row>
                            <div style={styles.borderBottomRadius}></div>
                            <Row className="p-top10">
                                <Col sm="4">
                                    Mệnh giá
                                </Col>
                                <Col sm="8" style={{color: 'red'}}>
                                    {data.MENHGIA}
                                </Col>
                            </Row>
                            <div style={styles.borderBottomRadius}></div>
                            <Row className="p-top10">
                                <Col sm="4">
                                    Lãi suất
                                </Col>
                                <Col sm="8" style={{color: 'red'}}>
                                    {data.LAISUAT_HH}
                                </Col>
                            </Row>
                            <div style={styles.borderBottomRadius}></div>
                            <Row className="p-top10">
                                <Col sm="4">
                                    Lãi suất tính
                                </Col>
                                <Col sm="8">
                                    {data.TS_DAMBAO}
                                </Col>
                            </Row>
                            <div style={styles.borderBottomRadius}></div>
                            <Row className="p-top10">
                                <Col sm="4">
                                    Ngày phát hành
                                </Col>
                                <Col sm="8">
                                    {data.NGAYPH}
                                </Col>
                            </Row>
                            <div style={styles.borderBottomRadius}></div>
                            <Row className="p-top10">
                                <Col sm="4">
                                    Ngày đáo hạn
                                </Col>
                                <Col sm="8">
                                    {data.NGAYDH}
                                </Col>
                            </Row>
                            <div style={styles.borderBottomRadius}></div>
                            <Row className="p-top10">
                                <Col sm="4">
                                    Thanh toán gốc và lãi
                                </Col>
                                <Col sm="8">
                                    {data.MS_KYHANTT}
                                </Col>
                            </Row>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Đóng</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export class KeepExpireBond extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isExpireBondNext: false,
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

    onConfirmBuy = ()=>{
        this.toggle();
        messFailed();
    }

    render(){
        let dataTmp = 1024214000;
        const closeBtn = <button className="close" style={{color: '#000', display: 'block'}} onClick={this.toggle}>&times;</button>;
        let Bondprev = (
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
                        01/05/2019<br/>
                        {dataTmp.toLocaleString(undefined, {maximumFractionDigits:2})} VND
                    </div>
                </div>
                <Row className="p-top10">
                    <Col>
                        <Button style={{width: '100%'}} outline color="info">Chưa tái đầu tư</Button>
                    </Col>
                    <Col>
                        <Button style={{width: '100%'}} outline color="danger">Đã tái đầu tư</Button>
                    </Col>
                </Row>
                <div style={styles.headerDetailBond}>Chi tiết dòng tiền</div>
                <Table bordered>
                    <thead>
                    <tr>
                        <th>Nội dung</th>
                        <th>Ngày nhận</th>
                        <th>Lãi tái đầu tư</th>
                        <th>Tiền nhận (VND)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Coupon</td>
                        <td>05/06/2020</td>
                        <td>293.300</td>
                        <td>48000000</td>
                    </tr>
                    <tr>
                        <td>Coupon</td>
                        <td>05/06/2020</td>
                        <td>293.300</td>
                        <td>48000000</td>
                    </tr>
                    <tr>
                        <td>Coupon</td>
                        <td>05/06/2020</td>
                        <td>293.300</td>
                        <td>48000000</td>
                    </tr>
                    </tbody>
                </Table>
                <div>
                    <div style={{display: 'flow-root'}}>
                        <div className="left">Tổng tiền nhận</div>
                        <div className="right" style={{color: 'red'}}>{dataTmp.toLocaleString(undefined, {maximumFractionDigits:2})} VND</div>
                    </div>
                    <div style={{display: 'flow-root'}}>
                        <div className="left">Gốc đầu tư</div>
                        <div className="right">1330000001100</div>
                    </div>
                    <div style={{display: 'flow-root'}}>
                        <div className="left">Lãi đầu tư</div>
                        <div className="right">1330000001100</div>
                    </div>
                    <div style={{display: 'flow-root'}}>
                        <div className="left">Lãi suất đầu tư</div>
                        <div className="right">7.2%</div>
                    </div>
                    <div style={{display: 'flow-root'}}>
                        <div className="left">Cho thời gian</div>
                        <div className="right">24 tháng</div>
                    </div>
                </div>
                <div style={{position: 'relative'}}>
                    <Button color="primary" style={{width: '100%', marginTop: 10}} onClick={this.onNextView}>Bấm để tiếp tục</Button>
                    <Icon type="right" style={styles.iconNext2}/>
                </div>
            </div>
        );

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
                            Lê Viết Khang
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
                            038095000298
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
                            IBond@vcsc-Vinpro
                                </Col>
                    </Row>
                    <Row>
                        <Col sm="5">
                            Mệnh giá
                                </Col>
                        <Col sm="7">
                            100,000
                                </Col>
                    </Row>
                    <Row>
                        <Col sm="5">
                            Ngày phát hành
                                </Col>
                        <Col sm="7">
                            28/05/2020
                                </Col>
                    </Row>
                    <Row>
                        <Col sm="5">
                            Ngày đáo hạn
                                </Col>
                        <Col sm="7">
                            28/05/2022
                                </Col>
                    </Row>
                    <Row>
                        <Col sm="5">
                            Ngày mua
                                </Col>
                        <Col sm="7">
                            23/05/2019
                                </Col>
                    </Row>
                    <Row>
                        <Col sm="5">
                            Số lượng đặt mua
                                </Col>
                        <Col sm="7">
                            3,000
                                </Col>
                    </Row>
                    <Row>
                        <Col sm="5">
                            Giá mua
                                </Col>
                        <Col sm="7" style={{ color: 'red' }}>
                            1,000,000,000
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
                            <Button style={{ width: '100%' }} outline color="success" onClick={this.onConfirmBuy}>Xác nhận</Button>
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
        boxShadow: '0 2px 3px rgba(0,0,0,0.23)',
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
