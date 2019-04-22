import * as api from '../../api/api';
import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED} from './actionTypes';

const loginRequest = (username)=>{
    return {
        type: LOGIN_REQUEST,
        username
    }
}

const loginSuccess= (info)=>{
    return {
        type: LOGIN_SUCCESS,
        info
    }
}

const loginFailed = (idAccount, password)=>{
    return {
        type: LOGIN_FAILED,
    }
}

export const login = (username, password)=> (dispatch)=>{
    dispatch(loginRequest(username));
    return api.loginApi(username, password).then((response)=>{
        if(response && response.success){
            const {data} = response;
            console.log(JSON.stringify(data));
            if (data && data.data && !data.error) {
                return dispatch(loginSuccess(data.data));
            }
              return dispatch(loginFailed(data.error));
        }
        return dispatch(loginFailed(response.message));
    });
}