export const accessToken = ()=>{
    return localStorage.getItem('accessTokenKey');
}

export const accessTokenBonds = ()=>{
    return localStorage.getItem('accessTokenBondsKey');
}


export const accountInfo = ()=>{
    return JSON.parse(localStorage.getItem('accountInfoKey'));
}

export const accessTokenVerify = ()=>{
    return localStorage.getItem('accessTokenVerifyKey');
}

export const timeoutDisconnect = ()=>{
    return localStorage.getItem('TimeoutDisconnect');
}

export const removeStorageToken = ()=>{
    localStorage.removeItem('accessTokenKey');
    localStorage.removeItem('accessTokenVerifyKey');
    localStorage.removeItem("TimeoutDisconnect");
    localStorage.removeItem("accountInfoKey");
    localStorage.removeItem("accessTokenBondsKey");
    return '';
}