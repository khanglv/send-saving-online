import React, {Component} from 'react';
import {
    Row, 
    Col,
    Container,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import { Table, Tag } from 'antd';



const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        code: `VCSC- bond ${i}`,
        interest: i + 0.4,
        limit: 65.1 + i,
        wait: 77 + i,
        remaining: 2 + i,
        TS: i%2===1 ? "Có" : "Không"
    });
}

class BondInvestor extends Component{
    constructor(props){
        super(props);
        this.state = {
            isPath: window.location.pathname === "/main",
            isLoading: false, //loading khi có scroll data, không có sẽ xóa
        };
    }

    render(){
        const columns = [
            {
                title: 'Mã TP',
                dataIndex: 'code',
                key: 'key',
                render: (code, key)=>{
                    let color = "blue";
                    if(key.key%2 === 0){
                        if(key.key % 4 === 0){
                            color = "red";
                        }else{
                            color = "green";
                        }
                    }
                    return(
                        <Tag color={color}><b>{code}</b></Tag>
                    )
                },
                sorter: (a, b) => a.wait - b.wait,
                width: "25%",
            },
            {
                title: 'Lãi suất/năm',
                dataIndex: 'interest',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.interest - b.interest,
                width: "15%",
            },
            {
                title: 'Hạn mức',
                dataIndex: 'limit',
                width: "15%",
            },
            {
                title: 'Đang chờ(tỷ)',
                dataIndex: 'wait',
                sorter: (a, b) => a.wait - b.wait,
                width: "15%",
            },
            {
                title: 'Tháng còn lại',
                dataIndex: 'remaining',
                sorter: (a, b) => a.remaining - b.remaining,
                width: "15%",
            },
            {
                title: 'TS đảm bảo',
                dataIndex: 'TS',
                width: "15%",
            },
        ];
        return(
            <div>
                {!this.state.isPath ? <div style={{ padding: 10 }}>
                    <Tag style={{ height: '10%' }} color="volcano"><b>Danh sách trái phiếu nhà đầu tư bán</b></Tag>
                </div> : null}
                <Container style={{ paddingTop: '1rem', height: '10%' }}>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="exampleSelect" style={styles.labelOption}>Tổ chức phát hành</Label>
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
                        <Col>
                            <FormGroup>
                                <Label for="exampleSelect" style={styles.labelOption}>Năm đáo hạn</Label>
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
                </Container>
                <div style={{ height: '80%' }}>
                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 15 }} loading={this.state.isLoading} scroll={{ y: '55vh' }} />
                </div>
            </div>
        );
    }
}

export default BondInvestor;

const styles={
    labelOption: {
        position: 'absolute', 
        top: '-1rem', 
        backgroundColor: '#f0f2f5', 
        left: '2rem', 
        paddingLeft: 5, 
        paddingRight: 5
    },
}