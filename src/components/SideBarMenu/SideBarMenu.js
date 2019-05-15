import React, { Component } from 'react';
import './style.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import Login from '../Login/Login';

const { Header, Sider, Content } = Layout;

export default class SideBarMenu extends Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <Layout className="aaaaa">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" >
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        {!this.state.collapsed ? <span>VBond</span> : null}
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="user"/>
                            <span>Trang chủ</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span>Option 1</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span>Option 2</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="logout" />
                            <span>Đăng xuất</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            height: '50rem',
                        }}
                    >
                        <Login></Login>
                    </Content>
                </Layout>
            </Layout>
        );
    }
};