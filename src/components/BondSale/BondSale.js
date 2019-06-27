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
import {getCashBalance} from '../../stores/actions/cashBalanceAction';
import * as common from '../Common/Common';

class BondSale extends Component{
    state = {
        isOpen: false,
        isOpenDetail: false,
        lstData: [],
        accountInfo: JSON.parse(localStorage.getItem('accountInfoKey'))
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
            const res2 =  await this.props.onGetCashBalance(this.state.accountInfo[0].accountNumber);
            if(res2.type === "CASH_BALANCE_FAILED"){
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

    onActionBuyBond = async(idBond)=>{
        await this.props.getDetailBond(idBond);
        await this.setState({isOpen: true, detailData: this.props.itemBond});
    }

    getDetailBond = async(idBond)=>{
        await this.props.getDetailBond(idBond);
        await this.setState({isOpenDetail: true, detailData: this.props.itemBond});
    }

    render(){
        return(
            <div >
                <ModalBuyBond open={this.state.isOpen} onClose={this.onCloseAlert} data={{...this.state.detailData, "cashBalance": this.props.cashBalance}} />
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
                                    <CardHeader style={styles.headerCard}>
                                        <b>{item.MSTP}</b> - <b>{item.LAISUATNAM}(%)</b><span>/năm</span><br/>
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
                                                <Button type="primary" style={{width: '100%'}} onClick={()=>this.onActionBuyBond(item.BOND_ID)}>Mua</Button>
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
        itemBond: state.getDetailBond.data,
        cashBalance: state.cashBalance.data
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getListRoomVCSC: ()=> dispatch(getListRoomVCSC()),
        getDetailBond: (idBond)=> dispatch(getDetailBond(idBond)),
        onGetCashBalance: (accountNumber)=> dispatch(getCashBalance(accountNumber))
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
        boxShadow: '0 4px 6px rgba(0,0,0,0.23)',
        border: 'none'
    },
    headerCard:{
        backgroundColor: '#4b81ba',
        color: '#fff'
    }
}