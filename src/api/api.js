import axios from 'axios';
import NProgress from 'nprogress';
import{setCookie, getCookie, clearCookie} from './cookie';
import * as storage from './storage';
import jwtDecode  from 'jwt-decode';

const BASE_URL = "http://vcsc.dev.tradex.vn:3000/api/v1";
const BASE_URL_PUBLIC = "http://rest.dev.tradex.vn:3000/api/v1/vcsc";
const TIME_OUT = 10000;
const IDVerify = "vcsc";
const PassVerify = "vcsc";
const accessTokenAuth = getCookie("AUTH_KEY");

const doRequest = async (options) => {
    try{
        NProgress.start();
        options = {
            ...options,
            timeout: TIME_OUT,
            config: {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            },
        }
        const response = await axios(options);
        if(response.status>= 200 && response.status < 300){
            NProgress.done();
            return response.data;
        }
    }catch(err){
        NProgress.done();
        console.log(err.response);
        if(err.response){
            if(err.response.status === 401){
                storage.removeStorageToken();
                window.location.href = "/login";
            }
            if(err.response.status === 501){
                alert("Request timeout, try again !!!");
            }
            return err.response.data;
        }else{
            alert("Server không phản hồi trong thời gian cho phép, thử lại !!!");
            return;
        }
    }
}

const callApi = (options, needAuth = false)=>{
    if(needAuth){
        const accessToken = storage.accessToken();
        const accessTokenVerify = storage.accessTokenVerify();
        if(accessTokenVerify){
            options = {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `jwt ${accessTokenVerify}`
                }
            }
        }else if(accessToken){
            options = {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `jwt ${accessToken}`
                }
            }
        }else if(accessTokenAuth){
            options = {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `jwt ${accessTokenAuth}`
                }
            }
        }else{
            alert("Access Token not found");
            return;
        }
    }
    return doRequest(options);
}

export const checkAuth = () => {
    if(accessTokenAuth){
        if (jwtDecode(accessTokenAuth).exp < Date.now() / 1000) {
            clearCookie("AUTH_KEY");
            requestAuth();
        }
    }else{
        requestAuth();
    }
}

const requestAuth = ()=>{
    const url = `${BASE_URL}/login`;
    const data = {
        "grant_type": "client_credentials", 
        "client_id": IDVerify, 
        "client_secret": PassVerify,
    };
    const options = {
        url: url,
        method: "POST",
        data: data
    }
    doRequest(options).then((response)=>{
        setCookie("AUTH_KEY", response.accessToken);
    }).catch((err)=>{
        console.log("Auth fail " + JSON.stringify(err));
        alert("Không thể xác thực Authentication");
        return;
    });
}

export const checkTokenOTPExpired = ()=>{
    const accessTokenVerify = storage.accessTokenVerify()
    if(accessTokenVerify){
        if (jwtDecode(accessTokenVerify).exp < Date.now() / 1000) {
            storage.removeStorageToken();
            window.location.href = "/login";
        }
    }
}

export const loginApi = (username, password)=>{
    const url = `${BASE_URL}/login`;
    const data = {
        "grant_type": "password_otp", 
        "client_id": IDVerify, 
        "client_secret": PassVerify, 
        "username": username,
        "password": password
    };
    const options = {
        url: url,
        method: "POST",
        data: data
    }
    return callApi(options);
}

export const verifyOTP = (codeOTP)=>{
    const url = `${BASE_URL}/login/sec/verifyOTP`;
    const data = {
        "otp_value": codeOTP
    };
    const options = {
        url: url,
        method: "POST",
        data: data
    }
    return callApi(options, true);
}

export const getMarketIndexList = ()=>{
    const url = `${BASE_URL_PUBLIC}/market/index/list`;
    const data = {};
    const options = {
        url: url,
        method: "GET",
        data: data
    }
    return callApi(options, true);
}