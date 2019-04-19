import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import Login from '../components/Login/Login';
import HeaderDetail from '../components/HeaderDetail/HeaderDetail';
import Main from '../components/Main/Main';


const RouteRUL = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/header" component={HeaderDetail} />
                <Route path="/login" component={Login} />
                <Route path="/home" component={Main} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default RouteRUL;