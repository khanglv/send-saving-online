import React, {Component} from 'react';
import { Timeline, Col, Row } from 'antd';

class userinfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            accountInfo: JSON.parse(localStorage.getItem('accountInfoKey')),
            userInfo: JSON.parse(localStorage.getItem('userInfoKey'))
        }
    }

    render(){
        const {
            accountInfo,
            userInfo
        } = this.state;
        return(
            <div>
                <Row>
                    <Col span={6}></Col>
                    <Col span={12}>
                        <b style={{fontSize: 24, color:  'green'}}>Thông tin cá nhân</b>
                        <div className="p-top20">
                            <Timeline>
                                <Timeline.Item color="green">Tên tài khoản: <b>{userInfo.customerName}</b></Timeline.Item>
                                <Timeline.Item color="green">Số tài khoản: <b>{accountInfo[0].accountNumber}</b></Timeline.Item>
                                <Timeline.Item color="green">Số CMND: <b>{userInfo.identifierNumber}</b></Timeline.Item>
                                <Timeline.Item color="green">Ngày cấp: <b>{userInfo.identifierNumber}</b></Timeline.Item>
                                <Timeline.Item color="green">Nơi cấp: <b>{userInfo.identifierIssuePlace}</b></Timeline.Item>
                                <Timeline.Item color="green">Địa chỉ: <b>{userInfo.address}</b></Timeline.Item>
                                <Timeline.Item color="green">Email: <b>{userInfo.email}</b></Timeline.Item>
                                <Timeline.Item color="red"><b style={{fontSize: 16, color: 'red'}}>Thông tin tài khoản</b></Timeline.Item>
                                <Timeline.Item color="green">Số tài khoản: <b>{accountInfo[0].accountNumber}</b></Timeline.Item>
                                <Timeline.Item color="green">Số tiền hiện có: <b>{accountInfo[0].accountNumber}</b></Timeline.Item>
                            </Timeline>
                        </div>
                    </Col>
                    <Col></Col> 
                </Row>
                
            </div>
        );
    }
};

export default userinfo;
