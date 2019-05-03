import axios from 'axios';
import NProgress from 'nprogress';

const BASE_URL = "http://utiltradex.ddns.net:3000/api/v1";
const TIME_OUT = 10000;
const IDVerify = "vcsc";
const PassVerify = "vcsc";
const accessToken = localStorage.getItem('accessTokenKey');

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
        if(err.response){
            return err.response.data;
        }else{
            alert("Server không phản hồi trong thời gian cho phép, thử lại !!!");
        }
    }
}

const callApi = (options, needAuth = false)=>{
    if(needAuth){
        if(accessToken){
            options = {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `jwt ${accessToken}`
                }
            }
        }else{
            alert("Access Token not found");
            window.location.href = "/login";
            return;
        }
    }
    return doRequest(options);
}

export const loginApi = (username, password)=>{
    const url = `${BASE_URL}/login`;
    const data = {
        "grant_type": "password", 
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

export const getMarketIndexList = ()=>{
    const url = `${BASE_URL}/market/index/list`;
    const data = {};
    const options = {
        url: url,
        method: "GET",
        data: data
    }
    return callApi(options);
}