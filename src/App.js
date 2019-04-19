import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {Provider} from 'react-redux';
import store from './stores/configureStore';
import RouteURL from './routers/Routers';

class App extends Component {
    render() {
        return (
            <Provider store={ store } >
                { <RouteURL /> }
            </Provider>
        );
    }
}

export default App;
