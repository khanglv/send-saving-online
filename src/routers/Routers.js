import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import {Error404} from '../components/Error404/Error404';
import Login from '../components/Login/Login';
import HeaderDetail from '../components/HeaderDetail/HeaderDetail';
import Main from '../components/Main/Main';
import Loading from '../components/Loading/Loading';

const RouteRUL = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/main" component={Main} />
                <Route path="/header" component={HeaderDetail} />
                <Route path="/Loading" component={Loading} />
                {/* nhập sai đường dẫn */}
                <Route exact path="*" component={Error404} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default RouteRUL;