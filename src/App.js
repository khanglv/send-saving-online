import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {checkAuth, checkTokenOTPExpired} from '../src/api/api';
import {Provider} from 'react-redux';
import store from './stores/configureStore';
import RouteURL from './routers/Routers';

class App extends Component {
    constructor(){
        super();
        checkAuth();
        checkTokenOTPExpired();
    }
    render() {
        return (
            <Provider store={ store } >
                { <RouteURL /> }
            </Provider>
        );
    }
}

export default App;
