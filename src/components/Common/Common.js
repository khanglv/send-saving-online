import moment from 'moment';
import { notification } from 'antd';

export const convertDDMMYYYY = (date)=>{
    return moment(new Date(date)).format('DD/MM/YYYY');
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
    let tmp1 = [a.slice(0, 2), b, a.slice(2)].join('');
    let tmp2 = [tmp1.slice(0, 5), b, tmp1.slice(5)].join('');
    let result = convertToFormat(tmp2)
    return result;
}