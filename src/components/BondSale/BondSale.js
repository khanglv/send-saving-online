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

import {connect} from 'react-redux';
import {getListRoomVCSC} from '../../stores/actions/roomVCSCAction';
import {getDetailBond} from '../../stores/actions/getDetailBondAction';
import * as common from '../Common/Common';

class BondSale extends Component{
    state = {
        isOpen: false,
        isOpenDetail: false,
        lstData: []
    };

    componentDidMount(){
        this.loadData();
    }

    loadData = async()=>{
        try {
            const res = await this.props.getListRoomVCSC();
            if(res.type === "ROOM_VCSC_FAILED"){
                common.notify('error', 'Thao tác thất bại :( ');
            }else{
                this.setState({lstData: res.data});
            }
        } catch (error) {
            console.log("err load data " + error);
        }
    }

    onCloseAlert = ()=>{
        this.setState({isOpen: false});
    }

    onCloseAlertDetail = ()=>{
        this.setState({isOpenDetail: false});
    }

    onActionBuyBond = (item)=>{
        this.setState({isOpen: true, detailData: item});
    }

    getDetailBond = async(idBond)=>{
        await this.props.getDetailBond(idBond);
        await this.setState({isOpenDetail: true, detailData: this.props.itemBond});
    }

    render(){
        return(
            <div >
                <ModalBuyBond open={this.state.isOpen} onClose={this.onCloseAlert}/>
                <DetailBond openDetail={this.state.isOpenDetail} onCloseDetail={this.onCloseAlertDetail} data={this.state.detailData} />
                <Alert color="primary" style={{marginBottom: 0}}>
                    <Tag color="green" style={{cursor: 'pointer'}}>Tất cả</Tag>&nbsp;
                    <Tag color="blue" style={{cursor: 'pointer'}}>Mới</Tag>&nbsp;
                    <Tag color="red" style={{cursor: 'pointer'}}>Phổ biến nhất</Tag>
                </Alert>
                <Row >
                    {this.state.lstData.map((item)=>{
                        return (
                            item.FLAG === 1 ? 
                            <Col xs="6" sm="3" key={item.BOND_ID}>
                                <Card style={styles.itemCard}>
                                    <CardHeader style={{backgroundColor: '#fff'}}>
                                        <b>{item.MSTP}</b> - <b style={{ color: 'red' }}>{item.LAISUATNAM}(%)</b><span>/năm</span><br/>
                                        <span style={{fontSize: 14}}>Kỳ hạn còn lại: {item.THANGCONLAI} tháng</span>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col>
                                                <span>
                                                    Hạn mức
                                                </span><br/>
                                                <span><b>{common.convertTextDecimal(item.HANMUC)}</b> VND</span>
                                            </Col>
                                            <Col>
                                                <span>
                                                    Đang chờ
                                                </span><br/>
                                                <span><b>{common.convertTextDecimal(item.DANGCHO)}</b> VND</span>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                    <CardFooter style={{backgroundColor: '#fff'}}>
                                        <Row>
                                            <Col>
                                                <Button style={{width: '100%'}} onClick={()=>this.getDetailBond(item.BOND_ID)}>Chi tiết</Button>
                                            </Col>
                                            <Col>
                                                <Button style={{width: '100%'}} type="primary" onClick={()=>this.onActionBuyBond(item)}>Mua</Button>
                                            </Col>
                                        </Row>
                                    </CardFooter>
                                </Card>
                            </Col> : null
                        )
                    })}
                </Row>
            </div>
        );
    }
};

const mapStateToProps = state =>{
    return{
        lstRoomVCSC: state.roomVCSC.data,
        itemBond: state.getDetailBond.data
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getListRoomVCSC: ()=> dispatch(getListRoomVCSC()),
        getDetailBond: (idBond)=> dispatch(getDetailBond(idBond)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (BondSale);

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