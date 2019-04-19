import React from 'react';

const BASE_URL = "http://utiltradex.ddns.net:3000/api/v1/";
const IDVerify = "vcsc";
const PassVerify = "vcsc";

const doRequest = async (url, options) =>{
    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if(response.status == 200){
            return json;
        }
    } catch (err) {
        alert("Lỗi  " + JSON.parse(err));
    }
}

const callApi = (url, options, needAuth = false)=>{
    if(needAuth){
        let tmpToken = "daylatoken";
        if(tmpToken){
            options = {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `jwt ${tmpToken}`
                }
            }
        }else{
            alert("Access Token not found");
        }
    }

    return doRequest(url, options);
}

export const loginApi = (username, password)=>{
    const url = `${BASE_URL}/login`;
    const data = {grant_type: "password", client_id: IDVerify, client_secret: PassVerify, username: username, password: password};
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data)
    }
    return callApi(url, options);
}