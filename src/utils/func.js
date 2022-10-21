import {
    getToken
} from './token.js'

export function getUserInfo(arg) {
    if (localStorage.getItem("data")) {
        var data = localStorage.getItem("data");
        data = JSON.parse(data);
        if (!data[arg] && arg == "avatar_uri") {
            return "file.jpg";
        }
        return data[arg];
    }
    var t = localStorage.getItem("token");
    if (t == null) {
        return null;
    }
    var obj = getToken(t);
    return obj[arg];
}

export function getTimeDiff(firstTime) {
    var dateBegin = new Date(firstTime.replace(/-/g, "/"));//将-转化为/，使用new Date
    var dateEnd = new Date();//获取当前时间
    var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
    var leave1 = dateDiff % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))//计算出小时数
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000)    //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))//计算相差分钟数
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000)
    console.log(" 相差 " + dayDiff + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
    console.log(dateDiff + "时间差的毫秒数", dayDiff + "计算出相差天数", leave1 + "计算天数后剩余的毫秒数"
        , hours + "计算出小时数", minutes + "计算相差分钟数", seconds + "计算相差秒数");
    //这里的dayDiff就是上文计算出的天数差
    let monthDiff = Math.floor(dayDiff / 30);//以30天为一个月不够精准严谨
    let yearDiff = Math.floor(monthDiff / 12);//获取相差的年份
    if (yearDiff < 1) {
        if (monthDiff > 1) {
            return monthDiff + "月";
        }
    } else {
        return yearDiff + "年";
    }
    if (dayDiff < 1) {
        if (Math.floor(dateDiff / (3600*1000)) < 1) {
            if (Math.floor(dateDiff / (60*1000)) < 1) {
                return Math.floor(dateDiff / 1000) + "秒";
            } else {
                return Math.floor(dateDiff / 1000 / 60) + "分钟";
            }
        } else {
            return Math.floor(dateDiff / 1000 / 3600) + "小时";
        }
    } else {
        return dayDiff + "天";
    }
}