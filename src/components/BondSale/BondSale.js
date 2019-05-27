import React, {Component} from 'react';
import {
    Row, 
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Alert,
} from 'reactstrap';
import { Button, Tag } from 'antd';
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
                <Alert color="primary" style={{marginBottom: 0}}>
                    <Tag color="green" style={{cursor: 'pointer'}}>Tất cả</Tag>&nbsp;
                    <Tag color="blue" style={{cursor: 'pointer'}}>Mới</Tag>&nbsp;
                    <Tag color="red" style={{cursor: 'pointer'}}>Phổ biến nhất</Tag>
                    {/* <Badge color="success" className="pointer">Tất cả</Badge>&nbsp;
                    <Badge color="primary" className="pointer">Mới</Badge>&nbsp;
                    <Badge color="danger" className="pointer">Phổ biến nhất</Badge> */}
                </Alert>
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