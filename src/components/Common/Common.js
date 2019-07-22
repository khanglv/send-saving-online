import moment from 'moment';
import { notification } from 'antd';

export const convertDDMMYYYY = (date)=>{
    return moment(new Date(date)).format('DD/MM/YYYY');
}

export const convertTime = (date)=>{
    return moment(new Date(date)).format('HH:mm');
}

export const convertToFormat = (date)=>{
    let dateTmp = date.split("/").reverse().join("/");
    return new Date(dateTmp).toISOString();
}

export const convertDatePicker = (date)=>{
    return moment(new Date(date));
}

export const notify = (type, data) => {
    notification[type]({
        message: 'Thông báo',
        description: data,
        style: {zIndex: '1000'}
    });
};

export const convertStringDate = (date)=>{
    return moment(new Date(date)).format('DD/MM/YYYY').split('/').join('');
}

export const convertTextDecimal = (number)=>{
    return parseInt(number).toLocaleString(undefined, {maximumFractionDigits:2})
}

export const splitStringDate = (a)=>{
    let b = "/";
    let tmp1 = [a.slice(0, 4), b, a.slice(4)].join('');
    let tmp2 = [tmp1.slice(0, 7), b, tmp1.slice(7)].join('');
    return new Date(tmp2).toISOString();;
}

export const warningConsole = ()=>{
    console.log("%cStop!!! You are unauthorized acces", "color: red; font-size: 40px; font-weight: bold;");
}
