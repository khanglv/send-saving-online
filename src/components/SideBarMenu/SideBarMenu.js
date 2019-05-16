import React, { Component } from 'react';
import './style.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import Login from '../Login/Login';

const { Sider, Header } = Layout;

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
            <Layout>
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
                            <span className="middle-text">Trang chủ</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span className="middle-text">Option 1</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span className="middle-text">Option 2</span>
                        </Menu.Item>
                        <Menu.Item key="4" style={{position: 'absolute', bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.2)'}}>
                            <Icon type="logout" />
                            <span className="middle-text">Đăng xuất</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ backgroundImage: `url(${"/images/header/stockboard-bg.png"})`, padding: 0, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                        <div style={{ position: 'relative' }}>
                            <div className="pointer hasHover" style={Object.assign({}, styles.boxStock, styles.boxStockHSX)} onClick={this.onGotoHSX}>HSX</div>
                            <div className="pointer hasHover" style={Object.assign({}, styles.boxStock, styles.boxStockHNX)} onClick={this.onGotoHNX}>HNX</div>
                            <div className="pointer hasHover" style={Object.assign({}, styles.boxStock, styles.boxStockUPCOM)} onClick={this.onGotoUPCOM}>UPCOM</div>
                        </div>
                    </Header>
                </Layout>
            </Layout>
        );
    }
};

const styles = {
    boxStock:{
        top: '1vh',
        border: '1px solid #dee2e6',
        paddingLeft: 5,
        paddingRight: 5,
        color: '#dee2e6',
        borderRadius: 3,
        position: 'absolute',
    },
    boxStockHSX:{
        right: '9.5rem',
    },
    boxStockHNX:{
        right: '6rem',
    },
    boxStockUPCOM:{
        right: '1rem',
    },
}