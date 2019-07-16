import moment from 'moment';

//convert ngày sau 1 khoảng thời gian (time =  số tháng)
const dateAfterTime = (date, time)=>{
    let d = new Date(date);
    return d.setMonth(d.getMonth() + time);
}

const dateToTime = (date)=>{
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

const diffDate = (firstDate, secondDate)=>{
    let oneDay = 24*60*60*1000;
    firstDate = new Date(firstDate);
    secondDate = new Date(secondDate);
    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
}

//Công thức tính trái phiếu mua giữ đến đáo hạn
export const GenDateInterestRate = (buyDate, dateF, dateT, totalDayInterestYear, expire, interestRate, lstTmp = [])=>{
    let dateFToTime = dateToTime(dateF);
    let dateFAfterExpiredToTime = dateToTime(dateAfterTime(dateF, expire));
    let dateTToTime = dateToTime(dateT);
    let dateBuyToTime = dateToTime(buyDate);

    let totalDayInterestMonth = totalDayInterestYear/12;
    let interestRateMonth = interestRate/12;
    let interestRateDay = interestRateMonth/totalDayInterestMonth;

    if(dateFAfterExpiredToTime <= dateTToTime){
        if(dateBuyToTime > dateFToTime){
            let deductReceived = diffDate(dateFToTime, dateBuyToTime)*interestRateDay;
            lstTmp.push({"date": timeToDate(dateFAfterExpiredToTime), "interestRate": (interestRateMonth*expire - deductReceived).toFixed(2)});
            GenDateInterestRate(buyDate, timeToDate(dateFAfterExpiredToTime), dateT, totalDayInterestYear, expire, interestRate, lstTmp);
            return lstTmp;
        }
        lstTmp.push({"date": timeToDate(dateFAfterExpiredToTime), "interestRate": (interestRateMonth*expire).toFixed(2)});
        GenDateInterestRate(buyDate, timeToDate(dateFAfterExpiredToTime), dateT, totalDayInterestYear, expire, interestRate, lstTmp);
    }
    return lstTmp;
}

export const formulaTest = (dateBuy, dateF, dateT, expired = 1)=>{
    let k = 0, n = 0;
    let dateFToTime = dateToTime(dateF);
    let dateBuyToTime = dateToTime(dateBuy);
    let dateExpired = dateToTime(dateAfterTime(dateF, expired));
    if(dateBuyToTime <= dateFToTime){
        n = diffDate(dateF, dateT);
    }else{
        if(dateExpired < dateBuyToTime){
            return formulaTest(dateBuy, dateExpired, dateT, expired);
        }
        k = diffDate(dateF, dateBuy);
        n = diffDate(dateBuy, dateT);
    }
    return {k, n};
}