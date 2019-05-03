import { combineReducers } from 'redux';

import login from './login';
import marketIndex from './marketIndex';

export default combineReducers({
    login: login,
    marketIndex: marketIndex
});