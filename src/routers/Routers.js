import React, {Component} from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';

import {Error404} from '../components/Error404/Error404';
import Login from '../components/Login/Login';
import Main from '../components/Main/Main';
import SideBarMenu from '../components/SideBarMenu/SideBarMenu';
import Directive from '../components/Directive/Directive';
import BondsAsset from '../components/MyAsset/MyBond';
import MySoldBond from '../components/MyAsset/MySoldBond';
import TestMain from '../components/Test/TestMain';
import HeaderDetail from '../components/HeaderDetail/HeaderDetail';

import { Layout } from 'antd';

const accessToken = localStorage.getItem('accessTokenKey');

class RouteRUL extends Component{
    constructor(props){
        super(props);
        this.state = {
            isShowLoading: true
        }
    }
    componentDidMount(){
        this.setState({isShowLoading : false});
    }

    shouldComponentUpdate(nextProps, nextState) {
        var currentRouteName = window.location.pathname;
        if(currentRouteName!=='/login' && !accessToken){
            window.location.href = "/login";
            return false;
        }
        return true;
    }

    render() {
        return (
                this.state.isShowLoading ? 
                    <div className="lds-spinner">
                        <div></div><div></div><div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
                : <BrowserRouter>
                    <Route path="/login" component={Login} />
                    <div>
                        <HeaderDetail />
                        <Layout>
                            <SideBarMenu />
                            <Layout>
                                <Switch>
                                    <Route exact path="/" component={Main} />
                                    <Route path="/main" component={Main} />
                                    <Route path="/sidebar" component={SideBarMenu} />
                                    <Route path="/directive" component={Directive} />
                                    <Route path="/bonds-asset" component={BondsAsset} />
                                    <Route path="/list-sold-bond" component={MySoldBond} />
                                    <Route path="/header" component={HeaderDetail} />
                                    <Route path="/test" component={TestMain} />
                                    {/* nhập sai đường dẫn */}
                                    <Route exact path="*" component={Error404} />
                                </Switch>
                            </Layout>
                        </Layout>
                    </div>
                </BrowserRouter>
        );
    }
}

export default RouteRUL;