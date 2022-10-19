import {
    getToken
} from './token.js'

export function getUserInfo(arg) {
    if (localStorage.getItem("data")) {
        var data = localStorage.getItem("data");
        data = JSON.parse(data);
        return data[arg];
    }
    var t = localStorage.getItem("token");
    if (t == null) {
        return null;
    }
    var obj = getToken(t);
    return obj[arg];
}