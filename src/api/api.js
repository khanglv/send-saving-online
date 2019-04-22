import axios from 'axios';

const BASE_URL = "http://utiltradex.ddns.net:3000/api/v1";
const IDVerify = "vcsc";
const PassVerify = "vcsc";
// const IDLogin = "068C003249";
// const passLogin = "techx123";


const doRequest = async (options) =>{
    try {
        const response = await axios(options);

        if(response.status >= 200 && response.status < 300){
            return response.data;
        }else{
            alert("Lỗi: " + response.statusText);
        }
    } catch (err) {
        alert("Lỗi:  Không thể kết nối server!!!");
    }
}

const callApi = (options, needAuth = false)=>{
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

    return doRequest(options);
}

export const loginApi = (username, password)=>{
    const url = `${BASE_URL}/login`;
    const data = {"grant_type": "password", "client_id": IDVerify, "client_secret": PassVerify, "username": username, "password": password};
    const options = {
        url: url,
        method: "POST",
        config: {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        },
        data: data
    }
    return callApi(options);
}