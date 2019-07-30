import moment from 'moment';

//convert ngày sau 1 khoảng thời gian (time =  số tháng)
const dateAfterTime = (date, time)=>{
    let d = new Date(date);
    return d.setMonth(d.getMonth() + time);
}

export const dateToTime = (date)=>{
    return moment(new Date(date)).format().valueOf();
}

const timeToDate = (time)=>{
    return moment(time);
}

export const diffMonth = (dateFrom, dateTo)=>{
    dateFrom = new Date(dateFrom);
    dateTo = new Date(dateTo);
    return dateTo.getMonth() - dateFrom.getMonth() +  (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));
}

export const convertDateToEarlyDay = (date)=>{
    let m = moment(date).utcOffset(0);
    m.set({hour:0,minute:0,second:0,millisecond:0});
    m.toISOString();
    return m.format();
}

export const dateTimeToDate = (date)=>{
    return moment(new Date(date)).format('YYYY-MM-DD');
}

const diffDate = (firstDate, secondDate)=>{
    let oneDay = 24*60*60*1000;
    firstDate = new Date(firstDate);
    secondDate = new Date(secondDate);
    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
}

//Công thức tính trái phiếu mua giữ đến đáo hạn
export const GenDateInterestRate = (buyDate, dateF, dateT, expire, lstTmp = [])=>{
    let dateFToTime = dateToTime(dateF);
    let dateFAfterExpiredToTime = dateToTime(dateAfterTime(dateF, expire));
    let dateTToTime = dateToTime(dateT);
    let dateBuyToTime = dateToTime(buyDate);

    if(dateFAfterExpiredToTime <= dateTToTime){
        if(dateBuyToTime >= dateFToTime){
            lstTmp.push({"date": timeToDate(dateFAfterExpiredToTime), "totalDay": diffDate(dateBuyToTime, dateFAfterExpiredToTime) - 1});
            GenDateInterestRate(buyDate, timeToDate(dateFAfterExpiredToTime), dateT, expire, lstTmp);
            return lstTmp;
        }
        lstTmp.push({"date": timeToDate(dateFAfterExpiredToTime), "totalDay": diffDate(dateF, dateFAfterExpiredToTime)});
        GenDateInterestRate(buyDate, timeToDate(dateFAfterExpiredToTime), dateT, expire, lstTmp);
    }
    return lstTmp;
}
