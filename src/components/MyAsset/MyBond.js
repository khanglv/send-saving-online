import React, {Component} from 'react';
import {
    Row, 
    Col,
    Table,
} from 'reactstrap';
import ModalSaleBond from '../../components/Modal/ModalSaleBond';
import { DatePicker, Tag, Icon, Tooltip } from 'antd';
import moment from 'moment';

const dateFormat = 'DD/MM/YYYY';

class BondsAsset extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
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
                <Row>
                    <Col sm="3">
                        <div>
                            <Tag color="orange">Từ ngày</Tag><br/>
                            <DatePicker className="datePickerNone" defaultValue={moment(new Date(), dateFormat)} format={dateFormat} />
                        </div>
                    </Col>
                    <Col sm="3">
                        <div>
                            <Tag color="orange">Đến ngày</Tag><br/>
                            <DatePicker className="datePickerNone" defaultValue={moment(new Date(), dateFormat)} format={dateFormat} />
                        </div>
                    </Col>
                </Row>
                <div className="p-top20">
                    <Table striped style={styles.customTable}>
                        <thead>
                            <tr style={styles.headerTable}>
                                <th></th>
                                <th>Mã trái phiếu</th>
                                <th>Tổng KL</th>
                                <th>Khả dụng</th>
                                <th>Đang mua</th>
                                <th>Đang bán</th>
                                <th>Đầu tư</th>
                                <th>Ngày mua</th>
                                <th>Kỳ hạn (tháng)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Tooltip title="Mua thêm trái phiếu"><Icon className="customIconHover" type="select"/></Tooltip>&nbsp;&nbsp;&nbsp;
                                    <Tooltip title="Bán trái phiếu" onClick={this.buyMoreBond}><Icon className="customIconHover" type="scissor"/></Tooltip>
                                </td>
                                <td>BONDS-VCSC-6050</td>
                                <td>3000</td>
                                <td>2900</td>
                                <td><Icon style={{color: '#28a745'}} type="check" /></td>
                                <td></td>
                                <td>2,000,000,000 VND</td>
                                <td>22/06/2019</td>
                                <td>19</td>
                            </tr>
                            <tr>
                                <td>
                                    <Tooltip title="Mua thêm trái phiếu"><Icon className="customIconHover" type="select"/></Tooltip>&nbsp;&nbsp;&nbsp;
                                    <Tooltip title="Bán trái phiếu"><Icon className="customIconHover" type="scissor"/></Tooltip>
                                </td>
                                <td>BONDS-HINATACHI-6050</td>
                                <td>3800</td>
                                <td>2900</td>
                                <td></td>
                                <td><Icon style={{color: '#28a745'}} type="check" /></td>
                                <td>4,500,000,000 VND</td>
                                <td>22/06/2019</td>
                                <td>19</td>
                            </tr>
                            <tr>
                                <td>
                                    <Tooltip title="Mua thêm trái phiếu"><Icon className="customIconHover" type="select"/></Tooltip>&nbsp;&nbsp;&nbsp;
                                    <Tooltip title="Bán trái phiếu"><Icon className="customIconHover" type="scissor"/></Tooltip>
                                </td>
                                <td>BONDS-VCSC-6050</td>
                                <td>3000</td>
                                <td>2900</td>
                                <td><Icon style={{color: '#28a745'}} type="check" /></td>
                                <td></td>
                                <td>2,000,000,000 VND</td>
                                <td>22/06/2019</td>
                                <td>19</td>
                            </tr>
                        </tbody>
                    </Table>
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
    }
}