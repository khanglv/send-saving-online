import axios from 'axios';
import NProgress from 'nprogress';
import{setCookie, getCookie, clearCookie} from './cookie';
import * as storage from './storage';
import jwtDecode  from 'jwt-decode';
import * as common from '../components/Common/Common';
import moment from 'moment';

const BASE_URL = "http://10.11.13.150:3000/api/v1";
const BASE_URL_PUBLIC = "http://10.11.13.150:3000/api/v1/";
const BASE_URL_BONDS = "http://10.11.0.113:3001";
const TIME_OUT = 10000;
const IDVerify = "vcsc";
const PassVerify = "vcsc";

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
                common.notify('error', 'Your request in valid, try again !!!');
            }
            if(err.response.status === 501){
                common.notify('error', 'Request timeout, try again !!!');
            }
            if(err.response.status === 403){
                common.notify('error', 'Bạn không có quyền truy cập !!!');
                window.location.href = "/login";
            }
        
            return err.response.data;
        }else{
            common.notify('error', 'Server không phản hồi, thử lại !!!');
            return;
        }
    }
}

//Xử lý api đăng nhập từ bên core
const callApi = (options, needToken = false, needAuth = false)=>{
    if(needAuth){
        const accessTokenAuth = getCookie("AUTH_KEY");
        if(accessTokenAuth){
            options = {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `jwt ${accessTokenAuth}`
                }
            }
        }else{
            alert("Token expired, refresh token");
            requestAuth();
            return null;
        }
    }
    if(needToken){
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
        }else{
            common.notify('error', "Cann't verify, please login again");
            window.location.href = "/login";
            return null;
        }
    }
    return doRequest(options);
}

export const checkAuth = () => {
    const accessTokenAuth = getCookie("AUTH_KEY");
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
        common.notify('error', "Không thể xác thực Authentication");
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
    return callApi(options, false, true);
}

export const verifyOTP = (codeOTP)=>{
    const accessToken = storage.accessToken();
    const url = `${BASE_URL}/login/sec/verifyOTP`;
    const data = {
        "otp_value": codeOTP
    };
    const options = {
        url: url,
        method: "POST",
        data: data,
        headers: {
            Authorization: `jwt ${accessToken}`
        }
    }
    return doRequest(options);
}

export const getCashBalance = (accountNumber)=>{
    const url = `${BASE_URL}/equity/account/cashBalance?accountNumber=${accountNumber}`;
    const data = {
        "accountNumber": accountNumber,
        "subNumber": "",
        "bankCode": "",
        "bankAccount": ""
    };
    const options = {
        url: url,
        method: "GET",
        data: data
    }
    return callApi(options, true, false);
}

export const getMarketIndexList = ()=>{
    const url = `${BASE_URL_PUBLIC}/market/index/list`;
    const data = {};
    const options = {
        url: url,
        method: "GET",
        data: data
    }
    return callApi(options, false, true);
}

//Xử lý api cho phần bonds
const callApiBonds = (options, needAuth = true)=>{
    if(needAuth){
        const accessTokenAuthBonds = storage.accessTokenBonds();
        if(accessTokenAuthBonds){
            options = {
                ...options,
                headers: {
                    Authorization: `Bearer ${accessTokenAuthBonds}`
                }
            }
        }else{
            common.notify('error', 'Không thể xác thực api');
        }
    }
    return doRequest(options);
}

export const verifyBonds = (dataSend)=>{
    const url = `${BASE_URL_BONDS}/login/core`;
    const data = {
        "MSNDT": dataSend.identifierNumber,
        "LOAINDT": 'CA_NHAN',
        "TENNDT": dataSend.accounts[0].accountName,
        "CMND_GPKD": "174784920",
        "NGAYCAP": moment(new Date()),
        "NOICAP": "TPHCM",
        "SO_TKCK": dataSend.accounts[0].accountNumber,
        "MS_NGUOIGIOITHIEU": 'MS_01'
    }
    const options = {
        url: url,
        method: "POST",
        data: data
    }
    return callApiBonds(options, false);
}

export const getListRoomVCSC = ()=>{
    const url = `${BASE_URL_BONDS}/roomVCSC`;
    const options = {
        url: url,
        method: "GET",
    }
    return callApiBonds(options);
}

export const getDetailBond = (idBond)=>{
    const url = `${BASE_URL_BONDS}/bonds/${idBond}`;
    const options = {
        url: url,
        method: "GET",
    }
    return callApiBonds(options);
}

