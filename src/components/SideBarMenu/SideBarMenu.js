import React, { Component } from 'react';
import './style.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import {ModalPopup} from '../Modal/Modal';
import {removeStorageToken} from '../../api/storage';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class SideBarMenu extends Component {
    state = {
        collapsed: false,
        isOpen: false,
        dataSendLogout: ""
    };

    onConFirmLogout = ()=>{
        this.setState({isOpen: true, dataSendLogout: 'Bạn có muốn Thoát khỏi trang hay không?'});
    }

    onLogout = ()=>{
        removeStorageToken();
        window.location.href = "/login";
    }
    
    onCloseAlert = ()=>{
        this.setState({isOpen: false});
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <ModalPopup title="Xác nhận" open={this.state.isOpen} onClose={this.onCloseAlert} dataSend={this.state.dataSendLogout} onActionOK={this.onLogout}/>
                    <div className="logo" >
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        {!this.state.collapsed ? <span>KhangLv@vcsc</span> : null}
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="home"/>
                            <span className="middle-text">Trang chủ</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="form" />
                            <span className="middle-text">Đặt lệnh</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                                    <Icon type="user-add" />
                                    <span>Tài sản của tôi</span>
                                </span>
                            }
                        >
                            <Menu.Item key="3">
                                <Icon type="strikethrough" />
                                <span className="middle-text">Cổ phiếu</span>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="strikethrough" />
                                <span className="middle-text">Trái phiếu</span>
                            </Menu.Item>
                        </SubMenu>
                        
                        <Menu.Item key="key_logout" onClick={this.onConFirmLogout} style={{position: 'absolute', bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.2)'}}>
                            <Icon type="logout" />
                            <span className="middle-text">Đăng xuất</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
        );
    }
};
