import React, { Component } from 'react';
import './style.css';
import { Layout, Menu, Icon } from 'antd';
import {ModalPopup} from '../Modal/Modal';
import {removeStorageToken} from '../../api/storage';
import { withRouter } from "react-router";
import * as common from '../Common/Common';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SideBarMenu extends Component {

    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
            isOpen: false,
            dataSendLogout: "",
            current: window.location.pathname,
            accountInfo: JSON.parse(localStorage.getItem('accountInfoKey'))
        };
    }

    componentDidMount(){
        common.warningConsole();
    }

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

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
        switch(e.key){
            case "/main": 
                this.props.history.push('/main');
                break;
            case "/directive":
                this.props.history.push('/directive');
                break;
            case "/bonds-asset":
                this.props.history.push('/bonds-asset');
                break;
            case "/list-sold-bond":
                this.props.history.push('/list-sold-bond');
                break;
            case "/bond-investor":
                this.props.history.push('/bond-investor');
                break;
            case "/user-info":
                this.props.history.push('/user-info');
                break;
            default:
                break;
        }
    };

    render() {
        return (
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <ModalPopup title="Xác nhận" open={this.state.isOpen} onClose={this.onCloseAlert} dataSend={this.state.dataSendLogout} onActionOK={this.onLogout}/>
                    <div className="logo">
                        {this.state.accountInfo ? !this.state.collapsed ? <div>
                                <span>{this.state.accountInfo[0].accountName}</span><br/>
                                <span>{this.state.accountInfo[0].accountNumber}</span>
                            </div> : null : null}
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </div>
                    <Menu theme="dark" mode="inline" defaultOpenKeys={['sub2']} selectedKeys={[this.state.current]} onClick={this.handleClick}>
                        <Menu.Item key="/main" className="middle-div">
                            <Icon type="home" />
                            <span>Trang chủ</span>
                        </Menu.Item>
                        <Menu.Item key="/directive" className="middle-div">
                            <Icon type="form" />
                            <span>Đặt lệnh</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub2"
                            title={
                                <span className="middle-div">
                                    <Icon type="shopping" />
                                    <span>Tài sản của tôi</span>
                                </span>
                            }
                        >
                            {/* <Menu.Item key="stock" className="middle-div">
                                <Icon type="strikethrough" />
                                <span>Cổ phiếu</span>
                            </Menu.Item> */}
                            <Menu.Item key="/bonds-asset" className="middle-div">
                                <span>Trái phiếu</span>
                            </Menu.Item>
                            {/* <Menu.Item key="/list-sold-bond" className="middle-div">
                                <Icon type="history" />
                                <span>Trái phiếu đã bán</span>
                            </Menu.Item> */}
                        </SubMenu>
                        <Menu.Item key="/bond-investor" className="middle-div">
                            <Icon type="usergroup-add" />
                            <span>Trái phiếu nhà đầu tư</span>
                        </Menu.Item>
                        <Menu.Item key="/user-info" className="middle-div">
                            <Icon type="profile" />
                            <span>Quản lý tài khoản</span>
                        </Menu.Item>
                        
                        <Menu.Item key="key_logout" className="middle-div" onClick={this.onConFirmLogout} style={{position: 'absolute', bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.2)'}}>
                            <Icon type="logout" />
                            <span>Đăng xuất</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
        );
    }
};

export default withRouter(SideBarMenu);