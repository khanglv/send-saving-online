import React from 'react';
import { withRouter } from "react-router";
import { 
    Input,
    Modal,
    ModalBody, 
    Row,
    Col,
    ModalHeader,
    Badge 
} from 'reactstrap';
import { DatePicker, Icon} from 'antd';
import moment from 'moment';

const dateFormat = 'DD/MM/YYYY';

class ModalSaleBond extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.isOpen,
            focusAfterClose: true
        };
        
    }

    toggle = ()=> {
        this.props.onClose();
    }

    onSaleForInvestor = ()=>{
        this.props.history.push('/bond-investor');
    }

    render() {
        return (
            <div>
                <Modal returnFocusAfterClose={this.state.focusAfterClose} toggle={this.toggle} isOpen={this.props.open} size="lg" centered>
                    <ModalHeader style={{backgroundColor: 'rgba(155, 183, 205, 0.48)'}}><span>Bán trái phiếu</span></ModalHeader>
                    <ModalBody>
                        <div>
                            <Badge color="danger" style={{fontSize: 14}}>Bonds-VCSC-1900</Badge>
                            {/* <p style={{ color: 'red', fontSize: 18 }}></p> */}
                            <Row className="p-top10">
                                <Col>
                                    Mệnh giá
                                </Col>
                                <Col>
                                    1,000,300,000 VND
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
                                    Ngày bán
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
                                    <Input type="number" id="exampleCity" style={{ maxHeight: 34 }} />
                                </Col>
                            </Row>
                            <div className="right p-top10">
                                Tổng số tiền đầu tư <br />
                                <span style={{ color: 'red', fontSize: 24 }}>4,005,000,000 VND</span>
                            </div>
                        </div>
                    <div className="clearfix"></div>
                        <div style={styles.borderBottom} className="p-top10"></div>
                        <div className="p-top10">
                            <i>Lãi suất đầu tư đã tái đầu tư</i>
                            <div className="p-top10">
                                <div style={styles.noteBond} onClick={this.onSaleForInvestor}>
                                    <div>
                                        <b style={{fontSize: 18}}>Bán cho khách hàng tiếp theo</b><br/>
                                        Lãi suất đầu tư dự kiến {}/năm<br/>
                                        Trong thời gian {} tháng
                                    </div>
                                    <Icon type="right" style={styles.iconNext}/>
                                </div>
                                <div style={Object.assign({}, styles.noteBond, {marginTop: 10})} onClick={this.onOpenSaleBeforeExpire}>
                                    <div>
                                        <b style={{fontSize: 18}}>Bán lại cho VCSC</b><br/>
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

export default withRouter(ModalSaleBond);

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
    borderBottomRadius:{
        borderBottom: '1px solid #e2e4ea'
    },
}
