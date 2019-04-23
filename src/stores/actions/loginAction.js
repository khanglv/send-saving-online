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

const loginFailed = (mes)=>{
    return {
        type: LOGIN_FAILED,
        message: mes
    }
}

export const login = (username, password)=> (dispatch)=>{
    dispatch(loginRequest(username));
    return api.loginApi(username, password).then((response)=>{
        if(response && response.success){
            const data = response;
            if (data && data.data && !data.error) {
                return dispatch(loginSuccess(data.data));
            }
                return dispatch(loginFailed(data.error));
        }
        return dispatch(loginFailed(response.message));
    }).catch(err=>{
        alert("lỗi: " + JSON.stringify(err));
    });
}