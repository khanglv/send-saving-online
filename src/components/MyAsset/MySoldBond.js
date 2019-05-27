import React, {Component} from 'react';
import {
    Row, 
    Col,
    Container,
    FormGroup,
    Label,
    Input,
    Table
} from 'reactstrap';

import { Icon } from 'antd';

class MySoldBond extends Component{
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
                <div>
                    <b>Danh sách trái phiếu nhà đầu tư bán</b>
                    <Container style={{paddingTop: '1rem'}}>
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
                    <div className="p-top20">
                        <Table striped style={styles.customTable}>
                            <thead>
                                <tr style={styles.headerTable}>
                                    <th>Mã TP</th>
                                    <th>Lãi suất/năm</th>
                                    <th>Hạn mức (tỷ)</th>
                                    <th>Đang chờ (tỷ)</th>
                                    <th>Tháng còn lại</th>
                                    <th>TS đảm bảo</th>
                                    <th>Ngày mua</th>
                                    <th>Kỳ hạn (tháng)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>BONDS-VCSC-6050</td>
                                    <td style={{color: 'red'}}>7.58%</td>
                                    <td>68.10</td>
                                    <td>0.5</td>
                                    <td>11.2</td>
                                    <td>Có</td>
                                    <td>19</td>
                                    <td>2900</td>
                                </tr>
                                <tr>
                                    <td>BONDS-Hitachi-6050</td>
                                    <td style={{color: 'red'}}>12.3%</td>
                                    <td>75.10</td>
                                    <td>0.8</td>
                                    <td>11.2</td>
                                    <td>Không</td>
                                    <td>19</td>
                                    <td>2900</td>
                                </tr>
                                <tr>
                                    <td>BONDS-otoma-6050</td>
                                    <td style={{color: 'red'}}>3.58%</td>
                                    <td>68.10</td>
                                    <td>0.5</td>
                                    <td>11.2</td>
                                    <td>Có</td>
                                    <td>19</td>
                                    <td>2900</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

export default MySoldBond;

const styles={
    labelOption: {
        position: 'absolute', 
        top: '-1rem', 
        backgroundColor: '#f0f2f5', 
        left: '2rem', 
        paddingLeft: 5, 
        paddingRight: 5
    },
    customTable:{
        boxShadow: '0 1px 2px rgba(0,0,0,0.23)',
        borderRadius: 5,
    },
    headerTable:{
        backgroundColor: '#528fc7',
        color: '#fff'
    }
}