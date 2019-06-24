import React, {Component} from 'react';
import BondSale from '../BondSale/BondSale';
import BondInvestor from '../BondInvestor/BondInvestor';
import { Tabs } from 'antd';
import {removeStorageToken} from '../../api/storage';

const { TabPane } = Tabs;

class Main extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            isOpenSaving: false,
            warningData: '',
            checkVerify: false,
            accessToken: localStorage.getItem('accessTokenKey'),
            accessTokenVerify : localStorage.getItem('accessTokenVerifyKey')
        };
    }
    
    static getDerivedStateFromProps(nextProps, prevProps) {
        if(prevProps.accessToken === '' || prevProps.accessToken === null || prevProps.accessTokenVerify === null || prevProps.accessTokenVerify === ''){
            removeStorageToken();
            window.location.href = "/login";
        }
        return null;
    }

    onCloseAlert = ()=>{
        this.setState({isOpen: false});
    }

    onCloseModalSaveMoney = ()=>{
        this.setState({isOpenSaving: false});
    }

    onSendSaveMoney = ()=>{
        this.setState({isOpenSaving: true});
    }

    render(){
        return(
            <div>
                <Tabs defaultActiveKey="1" style={{ padding: 20, paddingTop: 0}}>
                    <TabPane
                        tab={
                            <span>Trái phiếu VCSC</span>
                        }
                        key="1"
                    >
                        <BondSale/>
                    </TabPane>
                    <TabPane
                        tab={
                            <span>Trái phiếu nhà đầu tư</span>
                        }
                        key="2"
                    >
                        <BondInvestor />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Main;
