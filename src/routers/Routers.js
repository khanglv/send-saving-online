import React, {Component} from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';

import {Error404} from '../components/Error404/Error404';
import Login from '../components/Login/Login';
import HeaderDetail from '../components/HeaderDetail/HeaderDetail';
import Main from '../components/Main/Main';
import SideBarMenu from '../components/SideBarMenu/SideBarMenu';

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

    // shouldComponentUpdate(nextProps, nextState) {
    //     var currentRouteName = window.location.pathname;
    //     if(currentRouteName!=='/login' && !accessToken){
    //         window.location.href = "/login";
    //         return false;
    //     }
    //     return true;
    // }

    render() {
        return (
                this.state.isShowLoading ? 
                    <div className="lds-spinner">
                        <div></div><div></div><div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
                    :  <BrowserRouter>
                        <div>
                            <Switch>
                                <Route exact path="/" component={Main}/>
                                <Route path="/login" component={Login} />
                                <Route path="/main" component={Main} />
                                <Route path="/header" component={HeaderDetail} />
                                <Route exact path="/sidebar" component={SideBarMenu} />
                                {/* nhập sai đường dẫn */}
                                <Route exact path="*" component={Error404} />
                            </Switch>
                        </div>
                    </BrowserRouter>
        );
    }
}

export default RouteRUL;