import React, { Component } from 'react';
import IdleTimer from 'react-idle-timer';
import {ModalConfirm} from './components/Modal/Modal';
import {removeStorageToken} from './api/storage';
import App from './App';

export default class IdleTimerCom extends Component {
    constructor(props) {
        super(props)
        this.idleTimer = null
        this.onAction = this._onAction.bind(this)
        this.onActive = this._onActive.bind(this)
        this.onIdle = this._onIdle.bind(this)
        this.state = {
            isOpen: false,
            dataSendLogout: ""
        }
    }

    onCloseAlert = ()=>{
        this.setState({isOpen: false});
    }

    onLogout = ()=>{
        window.location.href = "/login";
    }

    render() {
        return (
            <div>
                <ModalConfirm title="Xác nhận" open={this.state.isOpen} dataSend={this.state.dataSendLogout} onActionOK={this.onLogout}/>
                <IdleTimer
                    ref={ref => { this.idleTimer = ref }}
                    element={document}
                    onActive={this.onActive}
                    onIdle={this.onIdle}
                    onAction={this.onAction}
                    debounce={250}
                    timeout={1000 * 60 * 30} />
                <App />
            </div>
        )
    }

    _onAction(e) {
        
    }

    _onActive(e) {
        
    }

    _onIdle(e) {
        removeStorageToken();
        this.setState({isOpen: true, dataSendLogout: "Bạn đã không thao tác một thời gian dài, hệ thống sẽ tự động đăng xuất"})
    }
}