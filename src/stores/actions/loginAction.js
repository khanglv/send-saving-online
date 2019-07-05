import * as api from '../../api/api';
import {
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_FAILED, 
    VERIFY_OTP_REQUEST, 
    VERIFY_OTP_SUCCESS, 
    VERIFY_OTP_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED
} from './actionTypes';

export const loginRequest = (username)=>{
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

const loginFailed = (errorMessage, status)=>{
    return {
        type: LOGIN_FAILED,
        message: errorMessage
    }
}

export const login = (username, password)=> (dispatch)=>{
    dispatch(loginRequest(username));
    return api.loginApi(username, password).then((response)=>{
        if(response && response.accessToken){
            localStorage.setItem('accessTokenKey', response.accessToken);
            return dispatch(loginSuccess(response));
        }
        return dispatch(loginFailed(response.message));
    }).catch(err=>{
        console.log("login err " + JSON.stringify(err));
    });
}

// verify OTP

export const verifyOTPRequest = (codeOTP)=>{
    return {
        type: VERIFY_OTP_REQUEST,
        codeOTP
    }
}

const verifyOTPSuccess= (info)=>{
    return {
        type: VERIFY_OTP_SUCCESS,
        info
    }
}

const verifyOTPFailed = (errorMessage)=>{
    return {
        type: VERIFY_OTP_FAILED,
        message: errorMessage
    }
}

export const verifyOTP = (codeOTP) => (dispatch)=>{
    dispatch(verifyOTPRequest(codeOTP));
    return api.verifyOTP(codeOTP).then((response)=>{
        if(response && response.accessToken){
            localStorage.setItem('accessTokenVerifyKey', response.accessToken);
            localStorage.setItem('accountInfoKey', JSON.stringify(response.userInfo.accounts))
            return dispatch(verifyOTPSuccess(response));
        }
        return dispatch(verifyOTPFailed(response.message));
    }).catch(err=>{
        console.log("login err " + JSON.stringify(err));
    });
}

export const getUser = fetchData => async (dispatch) => {
    dispatch({
        type: GET_USER_REQUEST,
    })
    try {
        const res = await api.getUser(fetchData);
        if (res && !res.error && !res.message) {
            localStorage.setItem('userInfoKey', JSON.stringify(res))
            return dispatch({
                type: GET_USER_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: GET_USER_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: GET_USER_FAILED,
            message: er,
        })
    }
}