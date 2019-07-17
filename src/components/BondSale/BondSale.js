import React, {Component} from 'react';
import {
    Row, 
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from 'reactstrap';
import { Button, Input, Empty, Skeleton } from 'antd';
import {ModalBuyBond, DetailBond} from '../Modal/ModalBuyBond';

import {connect} from 'react-redux';
import {getListRoomVCSC} from '../../stores/actions/roomVCSCAction';
import {getDetailBond} from '../../stores/actions/getDetailBondAction';
import {getCashBalance} from '../../stores/actions/cashBalanceAction';
import {getListFeeTrade} from '../../stores/actions/feeTradeAction';
import {updateMoneyAsset} from '../../stores/actions/updateMoneyAssetAction';
import * as common from '../Common/Common';

const { Search } = Input;

class BondSale extends Component{
    state = {
        isOpen: false,
        isOpenDetail: false,
        lstData: [],
        items: [],
        isFetching: false,
        accountInfo: JSON.parse(localStorage.getItem('accountInfoKey'))
    };

    componentDidMount(){
        this.loadData();
    }

    loadData = async()=>{
        try {
            const res = await this.props.getListRoomVCSC();
            if(res.type === "ROOM_VCSC_FAILED"){
                this.setState({isFetching: true});
                common.notify('error', 'Thao tác thất bại :( ');
            }else{
                this.setState({lstData: res.data, isFetching: true});
            }
            const res2 =  await this.props.onGetCashBalance(this.state.accountInfo[0].accountNumber);
            if(res2.type === "CASH_BALANCE_FAILED"){
                common.notify('error', 'Thao tác thất bại :( ');
            }else{
                await this.props.updateMoneyAsset({
                    "MSNDT": this.state.accountInfo[0].accountNumber,
                    "SOTIEN": res2.data.depositAmount
                });
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
        try {
            await this.props.getDetailBond(idBond);
            await this.props.getListFeeTrade();
            await this.setState({isOpen: true, detailData: {
                ...this.props.itemBond,
                "GIATRI_HIENTAI": this.props.itemBond.GIATRI_HIENTAI === null ? this.props.itemBond.MENHGIA : this.props.itemBond.GIATRI_HIENTAI,
                "feeTrade": this.props.lstFeeTrade.filter(item => item.LOAIGIAODICH === 1 && item.TRANGTHAI === 1).map(item =>{
                    return item.TYLETINH
                })
            }});
        } catch (error) {
            common.notify("error", "Thao tác thất bại :(");
        }
    }

    getDetailBond = async(idBond)=>{
        await this.props.getDetailBond(idBond);
        await this.setState({isOpenDetail: true, detailData: {
            ...this.props.itemBond,
            "GIATRI_HIENTAI": this.props.itemBond.GIATRI_HIENTAI === null ?this.props.itemBond.MENHGIA : this.props.itemBond.GIATRI_HIENTAI
        }});
    }

    filterList = (event)=>{
        var updatedList = this.props.lstRoomVCSC;
        updatedList = updatedList.filter(function(item){
            return item.MSTP.toLowerCase().search( `${event.target.value}`.toLowerCase()) !== -1;
        });
        this.setState({lstData: updatedList});
    }

    render(){
        return(
            <div >
                <ModalBuyBond open={this.state.isOpen} onClose={this.onCloseAlert} loadData={this.loadData} data={{...this.state.detailData, "cashBalance": this.props.cashBalance}} />
                <DetailBond openDetail={this.state.isOpenDetail} onCloseDetail={this.onCloseAlertDetail} data={this.state.detailData} />
                {/* <Affix offsetTop={window.innerHeight*0.15}>
                    <Alert color="primary" style={{marginBottom: 0}}>
                        <Tag color="green" style={{cursor: 'pointer'}} onClick={this.test}>Tất cả</Tag>&nbsp;
                        <Tag color="blue" style={{cursor: 'pointer'}}>Mới</Tag>&nbsp;
                        <Tag color="red" style={{ cursor: 'pointer' }}>Phổ biến nhất</Tag>
                        <Search
                            placeholder="Mã trái phiếu"
                            onSearch={this.filterList}
                            style={{ width: '10vw', float: 'right', top: '-0.2rem' }}
                        />
                    </Alert>
                </Affix> */}
                <Skeleton active loading={!this.state.isFetching}>
                    <Search
                        placeholder="Mã trái phiếu"
                        onChange={this.filterList}
                        style={{ width: '10vw', position: 'absolute', top: '0.4rem', right: '2rem', borderColor: '#5073a2' }}
                    />
                        {this.state.isFetching ? 
                        this.state.lstData.length > 0 ? this.state.lstData.filter(item => item.FLAG === 1).map((item)=>{
                            return (
                                <Row key={item.BOND_ID} style={{paddingLeft: '2rem', paddingRight: '2rem'}}>
                                    <Col xs="12" sm="3">
                                        <Card style={styles.itemCard}>
                                            <CardHeader style={styles.headerCard}>
                                                <b>{item.MSTP}</b> - <b>{item.LAISUAT_BAN} (%)</b><span>/năm</span><br />
                                                <span style={{ fontSize: 14 }}>Kỳ hạn còn lại: {item.THANGCONLAI} tháng</span>
                                            </CardHeader>
                                            <CardBody>
                                                <p>Số lượng: <b>{common.convertTextDecimal(item.SL_DPH)}</b></p>
                                                <Row>
                                                    <Col sm="8">
                                                        <span>
                                                            Hạn mức
                                                        </span><br />
                                                        <div className="centerVertical">
                                                            <b>{common.convertTextDecimal(item.HANMUC)}</b><span style={{fontSize: 10}}>&nbsp;VND</span>
                                                        </div>
                                                    </Col>
                                                    <Col sm="4">
                                                        <span>
                                                            Đang chờ
                                                            </span><br />
                                                        <span><b>{common.convertTextDecimal(item.DANGCHO)}</b></span>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                            <CardFooter style={{ backgroundColor: '#fff' }}>
                                                <Row>
                                                    <Col>
                                                        <Button style={{ width: '100%' }} onClick={() => this.getDetailBond(item.BOND_ID)}>Chi tiết</Button>
                                                    </Col>
                                                    <Col>
                                                        <Button className="btnSaleBond" style={{ width: '100%' }} onClick={() => this.onActionBuyBond(item.BOND_ID)}>Mua</Button>
                                                    </Col>
                                                </Row>
                                            </CardFooter>
                                        </Card>
                                    </Col>
                                </Row>
                            )
                        }) : <div className="text-center"><Empty /></div> : null}
                    </Skeleton>    
            </div>
        );
    }
};

const mapStateToProps = state =>{
    return{
        lstRoomVCSC: state.roomVCSC.data,
        itemBond: state.getDetailBond.data,
        cashBalance: state.cashBalance.data,
        lstFeeTrade: state.feeTrade.data
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getListRoomVCSC: ()=> dispatch(getListRoomVCSC()),
        getListFeeTrade: ()=>dispatch(getListFeeTrade()),
        getDetailBond: (idBond)=> dispatch(getDetailBond(idBond)),
        onGetCashBalance: (accountNumber)=> dispatch(getCashBalance(accountNumber)),
        updateMoneyAsset: (data)=> dispatch(updateMoneyAsset(data))
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
        marginTop: 20,
        boxShadow: '0 4px 6px rgba(0,0,0,0.23)',
        border: 'none'
    },
    headerCard:{
        background: 'linear-gradient(to right, #5073a2, #8ca7cc)',
        color: '#fff'
    }
}