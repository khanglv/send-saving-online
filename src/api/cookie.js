export const setCookie = (name, value, times, path = '/') => {
    let expires = '';
    if (times) {
        let date = new Date();
        date.setTime(date.getTime() + (times * 24 * 60 * 60 * 1000));
        expires = `; expires=${date.toUTCString()};`;
    } 
    document.cookie = `${name}=${value}${expires}; path=${path}`;
};

export const getCookie = (cookieName) => {
    if (document.cookie.length > 0) {
        let cookieStart = document.cookie.indexOf(cookieName + '=');
        if (cookieStart !== -1) {
            cookieStart = cookieStart + cookieName.length + 1;
            let cookieEnd = document.cookie.indexOf(';', cookieStart);
            if (cookieEnd === -1) {
                cookieEnd = document.cookie.length;
            }
            return window.unescape(document.cookie.substring(cookieStart, cookieEnd));
        }
    }
    return '';
};

export const clearCookie = (name)=>{
    if(getCookie(name)){
        setCookie(name, '', -1, '/');
    }
}