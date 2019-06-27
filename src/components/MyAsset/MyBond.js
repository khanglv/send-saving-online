import React, {Component} from 'react';
import {
    Row, 
    Col,
    Label
} from 'reactstrap';
import ModalSaleBond from '../../components/Modal/ModalSaleBond';
import { Tabs, DatePicker, Icon, Tooltip, Table, Popconfirm } from 'antd';
import moment from 'moment';

const TabPane = Tabs.TabPane;
const dateFormat = 'DD/MM/YYYY';

class BondsAsset extends Component{
    constructor(props){
        super(props);
        this.columns = [
            {
                title: 'STT',
                dataIndex: 'key',
                width: 30,
            },
            {
                title: 'Action',
                dataIndex: 'operation',
                width: 120,
                render: (text, record) =>{
                    return(
                        this.state.dataSource.length >= 1 ?
                            <div>
                                <Tooltip title="Duyệt" className="pointer">
                                    <Icon type="check" style={{color: '#1cd356', fontSize: 16}}/>
                                </Tooltip>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Popconfirm title="Hủy duyệt lệnh này???" onConfirm={() => this.handleDelete()}>
                                    <Tooltip title="Hủy duyệt" className="pointer">
                                        <Icon type="close" style={{color: '#f5222d', fontSize: 16}}/>
                                    </Tooltip>
                                </Popconfirm>
                            </div>
                         : null
                    )
                }
            },
            {
                title: 'Trái Phiếu', //1
                dataIndex: 'MSTP',
                width: 250
            },
            {
                title: 'Nhà đầu tư', //2
                dataIndex: 'TENNDT',
                width: 250
            },
            {
                title: 'MS Người giới thiệu', //3
                dataIndex: 'MS_NGUOI_GT',
                width: 150
            },
            {
                title: 'Số lượng',
                dataIndex: 'SOLUONG',
                width: 100
            },
            {
                title: 'Đơn giá',
                dataIndex: 'DONGIA',
                width: 200
            },
            {
                title: 'Tổng giá trị',
                dataIndex: 'TONGGIATRI',
                width: 220
            },
            {
                title: 'Lãi suất',
                dataIndex: 'LAISUAT_DH',
                width: 150
            },
            {
                title: 'Ngày giao dịch',
                dataIndex: 'NGAY_GD',
                width: 150
            }
        ]
        this.state = {
            isOpen: false,
            dataSource: []
        };
    }

    buyMoreBond = ()=>{
        this.setState({isOpen: true});
    }

    onClose = ()=>{
        this.setState({isOpen: false});
    }

    render(){
        return(
            <div style={{padding: 10}}>
                <ModalSaleBond open={this.state.isOpen} onClose={this.onClose}/>
                <Tabs>
                    <TabPane tab="Trái phiếu hiện có" key="1">
                        <Row>
                        <Col sm="8"></Col>
                        <Col sm="2">
                            <div>
                                <Label for="exampleSelect" style={styles.labelOption}>Từ ngày</Label>
                                <DatePicker className="datePickerNone" defaultValue={moment(new Date(), dateFormat)} format={dateFormat} />
                            </div>
                        </Col>
                        <Col sm="2">
                            <div>
                                <Label for="exampleSelect" style={styles.labelOption}>Đến ngày</Label>
                                <DatePicker className="datePickerNone" defaultValue={moment(new Date(), dateFormat)} format={dateFormat} />
                            </div>
                        </Col>
                </Row>
                    </TabPane>
                    <TabPane tab="Đang chờ duyệt" key="2">

                    </TabPane>
                    <TabPane tab="Lịch sử giao dịch" key="3">

                    </TabPane>
                </Tabs>
                <div className="p-top10" style={{padding: 10}}>
                    <Table
                        bordered
                        dataSource={this.state.dataSource}
                        size="small"
                        columns={this.columns}
                        pagination={{ pageSize: 15 }}
                    />
                </div>
            </div>
        );
    }
}

export default BondsAsset;

const styles={
    customTable:{
        boxShadow: '0 1px 2px rgba(0,0,0,0.23)',
        borderRadius: 5,
    },
    headerTable:{
        backgroundColor: '#528fc7',
        color: '#fff'
    },
    labelOption: {
        position: 'absolute', 
        top: '-0.8rem', 
        backgroundColor: '#fff', 
        left: '1.5rem', 
        paddingLeft: 5, 
        paddingRight: 5,
        fontSize: 13,
        color: '#4b81ba',
        zIndex: '1000'
    },
}