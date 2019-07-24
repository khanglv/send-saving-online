import React, {Component} from 'react';
import {
    Row, 
    Col,
    Container,
    Label,
} from 'reactstrap';
import { Table, Tag, Select } from 'antd';

const { Option } = Select;

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
            <div style={{padding: '1rem'}}>
                <Container style={{ paddingTop: '1rem', height: '10%' }}>
                    <Row>
                        <Col>
                            <Label for="exampleSelect" style={styles.labelOption}>Tổ chức phát hành</Label>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a person"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </Col>
                        <Col>
                            <Label for="exampleSelect" style={styles.labelOption}>Chương trình bán</Label>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a person"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </Col>
                        <Col>
                            <Label for="exampleSelect" style={styles.labelOption}>Gói thanh toán</Label>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a person"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </Col>
                        <Col>
                            <Label for="exampleSelect" style={styles.labelOption}>Năm đáo hạn</Label>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a person"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </Col>
                    </Row>
                </Container>
                <div style={{ height: '80%' }}>
                    <Table 
                        columns={columns} 
                        dataSource={data}
                        size="small"
                        bordered
                        pagination={{ pageSize: 15 }} 
                        loading={this.state.isLoading} 
                        scroll={{ y: '55vh' }} 
                    />
                </div>
            </div>
        );
    }
}

export default BondInvestor;

const styles={
    labelOption: {
        position: 'absolute', 
        top: '-0.9rem', 
        backgroundColor: '#fff', 
        left: '1.3rem',
        paddingLeft: '0.3rem',
        paddingRight: '0.3rem',
        zIndex: 1000,
        fontSize: 13
    },
}