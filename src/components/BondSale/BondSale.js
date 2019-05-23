import React, {Component} from 'react';
import {
    Row, 
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter
} from 'reactstrap';
import { Button } from 'antd';
import {ModalBuyBond, DetailBond} from '../Modal/ModalBuyBond';
import data from './dataTmp.json';

class BondSale extends Component{
    state = {
        isOpen: false,
        isOpenDetail: false,
        detailData: []
    };

    onCloseAlert = ()=>{
        this.setState({isOpen: false});
    }

    onCloseAlertDetail = ()=>{
        this.setState({isOpenDetail: false});
    }

    onActionBuyBond = (item)=>{
        this.setState({isOpen: true, detailData: item});
    }

    onActionDetailBond = (item)=>{
        this.setState({isOpenDetail: true, detailData: item});
    }

    render(){
        return(
            <div style={{padding: 20, height: '85vh'}}>
                <ModalBuyBond open={this.state.isOpen} onClose={this.onCloseAlert} data={this.state.detailData}/>
                <DetailBond openDetail={this.state.isOpenDetail} onCloseDetail={this.onCloseAlertDetail} data={this.state.detailData} />
                {/* <div>
                    <b>Danh sách trái phiếu nhà đầu tư bán</b>
                    <Container style={{paddingTop: '2rem'}}>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleSelect" style={styles.labelOption}>Tổ chức phát hành</Label>
                                    <Input type="select" name="select" id="exampleSelect" style={{background: 'none'}}>
                                        <option>Tất cả</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                    <Label for="exampleSelect" style={styles.labelOption}>Chương trình bán</Label>
                                    <Input type="select" name="select" id="exampleSelect" style={{background: 'none'}}>
                                        <option>Tất cả</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                    <Label for="exampleSelect" style={styles.labelOption}>Gói thanh toán</Label>
                                    <Input type="select" name="select" id="exampleSelect" style={{background: 'none'}}>
                                        <option>Tất cả</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                    <Label for="exampleSelect" style={styles.labelOption}>Năm đáo hạn</Label>
                                    <Input type="select" name="select" id="exampleSelect" style={{background: 'none'}}>
                                        <option>Tất cả</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Container>
                </div> */}
                <Row >
                    {data.map((item)=>{
                        return (
                            <Col xs="6" sm="3" key={item.ID}>
                                <Card style={styles.itemCard}>
                                    <CardHeader style={{backgroundColor: '#fff'}}>
                                        <b>{item.MS_DN}</b> - <b style={{ color: 'red' }}>{item.LAISUAT_HH}</b><span>/năm</span><br/>
                                        <span style={{fontSize: 14}}>Kỳ hạn còn lại: {item.KYHAN_CONLAI} tháng</span>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col>
                                                <span>
                                                    Hạn mức
                                                </span><br/>
                                                <span><b>{item.HANMUC_CHO}</b> tỷ</span>
                                            </Col>
                                            <Col>
                                                <span>
                                                    Đang chờ
                                                </span><br/>
                                                <span><b>{item.HANMUC_CHO}</b> tỷ</span>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                    <CardFooter style={{backgroundColor: '#fff'}}>
                                        <Row>
                                            <Col>
                                                <Button style={{width: '100%'}} onClick={()=>this.onActionDetailBond(item)}>Chi tiết</Button>
                                            </Col>
                                            <Col>
                                                <Button style={{width: '100%'}} type="primary" onClick={()=>this.onActionBuyBond(item)}>Mua</Button>
                                            </Col>
                                        </Row>
                                    </CardFooter>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </div>
        );
    }
};

export default BondSale;

const styles = {
    labelOption: {
        position: 'absolute', 
        top: '-1rem', 
        backgroundColor: '#f0f2f5', 
        left: '2rem', 
        paddingLeft: 5, 
        paddingRight: 5
    },
    itemCard:{
        marginTop: 30,
        boxShadow: '0 2px 3px rgba(0,0,0,0.23)',
        border: 'none'
    }
}