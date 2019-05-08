export const accessToken = ()=>{
    return localStorage.getItem('accessTokenKey');
}

export const accessTokenVerify = ()=>{
    return localStorage.getItem('accessTokenVerifyKey');
}

export const removeStorageToken = ()=>{
    localStorage.removeItem('accessTokenKey');
    localStorage.removeItem('accessTokenVerifyKey');
    return '';
}