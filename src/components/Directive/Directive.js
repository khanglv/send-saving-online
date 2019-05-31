import React, {Component} from 'react';
import {
    Row, 
    Col,
    Label,
    Input,
    Badge,
    Alert,
    Table,
    FormGroup,
    Button
} from 'reactstrap';
import { Tabs, DatePicker, Checkbox } from 'antd';
import moment from 'moment';

const TabPane = Tabs.TabPane;
const dateFormat = 'DD/MM/YYYY';

export default class Directive extends Component{
    render(){
        return(
            <div style={{padding: 10, height: '85vh', display: 'flex'}}>
                <div style={styles.viewOptionLeft}>
                    <div className="p-top10" style={{position: 'relative'}}>
                        <Label for="exampleSelect" style={styles.labelInput}>Mã trái phiếu</Label>
                        <Input id="exampleSelect" style={{background: 'none'}} />
                    </div>
                    <div className="p-top20">
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleSelect" style={styles.labelOption}>Chương trình bán</Label>
                                    <Input type="select" name="select" id="exampleSelect" style={{ background: 'none' }}>
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
                                    <Input type="select" name="select" id="exampleSelect" style={{ background: 'none' }}>
                                        <option>Tất cả</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="p-top10">
                            <Col>
                                <FormGroup>
                                    <Label for="exampleSelect" style={Object.assign({}, styles.labelOption, {zIndex: '1000'})}>Ngày giao dịch</Label>
                                    <DatePicker className="customDatePicker" defaultValue={moment(new Date(), dateFormat)} format={dateFormat}/>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleSelect" style={styles.labelOption}>Số lượng</Label>
                                    <Input id="exampleSelect" style={{ background: 'none' }}></Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <div>
                            <i>Hạn mức:</i> <span style={{color: 'red'}}>2 tỉ</span> - <i>Đơn giá</i> <span style={{color: 'red'}}>107,500 VND</span>
                        </div>
                    </div>
                    <div className="p-top10" style={styles.borderBottomRadius}></div>
                    <div className="p-top10">
                        <Row>
                            <Col sm="9">
                                <span>Lãi suất giữ đến đáo hạn (đã tái đầu tư)</span>
                            </Col>
                            <Col sm="3">
                                <span style={{color: 'red'}}> 8.29</span>%
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="9">
                                <Checkbox onChange={this.onChange}><span style={{fontSize: 16, color: '#000'}}>Đăng kí trái tức sinh lời để hưởng lãi suất</span></Checkbox>
                            </Col>
                            <Col sm="3">
                                <span style={{color: 'red'}}> 8.36</span>%
                            </Col>
                        </Row>
                    </div>
                    <div className="p-top10" style={styles.borderBottomRadius}></div>
                    <div className="p-top20">
                        <Row>
                            <Col>
                                <Input placeholder="Mã giới thiệu"></Input>
                            </Col>
                            <Col>
                                <span style={{color: 'red'}} ><i className="fa fa-question-circle"></i> <span style={{fontSize: 14}}>Tìm hiểu chương trình</span></span>
                            </Col>
                        </Row>
                    </div>
                    <div className="p-top10">
                        <Row>
                            <Col sm="7">
                                Tổng tiền đầu tư<br/>
                                <span style={{color: 'red', fontSize: 18}}>10,000,000</span>
                            </Col>
                            <Col sm="5">
                                <Button color="danger">Đặt mua</Button>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div style={styles.viewOptionRight}>
                    <div style={{position: 'relative'}}>
                        <Alert color="primary" style={{marginBottom: '0.3rem'}}>
                            <b>Thông tin đầu tư</b>&nbsp;<Badge style={{fontSize: 16}} color="danger">iBond-VCSC</Badge>
                        </Alert>
                        <span>
                            <i>Đáo hạn:</i> <span>19/10/2022</span> <i>- Tổ chức phát hành:</i> <span>Công ty Chứng Khoán Bản Việt - VCSC</span>
                        </span>
                    </div>
                    <div className="p-top10">
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
                    </div>
                    <div className="p-top10">
                        <div style={{color: 'red'}}>*Lưu ý</div>
                        <span>Lợi tức hiện tại có thể dùng để so sánh thu nhập lãi của trái phiếu với thu nhập cổ tức của cổ phiếu. Nó được tính bằng cách chia  lượng trái tức hàng năm theo giá hiện hành của trái phiếu. Hãy nhớ rằng lợi tức này chỉ là một phần lợi nhuận thu nhập, không tính khoản thu vốn hoặc lỗ có thể phát sinh. Như vậy, với các nhà đầu tư chỉ quan tâm đến thu nhập hiện tại, lợi nhuận này là hữu ích nhất.</span>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    viewOptionLeft:{
        padding: 10,
        backgroundColor: '#fff',
        height: '100%',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.23)',
        borderRadius: 5,
        flex: 1,
    },
    viewOptionRight:{
        padding: 10,
        backgroundColor: '#fff',
        height: '100%',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.23)',
        marginLeft: 10,
        borderRadius: 5,
        flex: 3,
    },
    labelInput: {
        position: 'absolute', 
        top: '-0.3rem', 
        backgroundColor: '#fff', 
        left: '1rem', 
        paddingLeft: 5, 
        paddingRight: 5
    },
    labelOption: {
        position: 'absolute', 
        top: '-0.8rem', 
        backgroundColor: '#fff', 
        left: '1.5rem', 
        paddingLeft: 5, 
        paddingRight: 5,
        fontSize: 13
    },
    borderBottomRadius:{
        borderBottom: '1px solid #e2e4ea'
    },
}