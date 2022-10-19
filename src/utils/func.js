import {
    setToken
} from './token.js'



export function getUserInfo(arg) {
    var t = localStorage.getItem("token");
    if (t == null) {
        return null;
    }
    var obj = setToken(t);
    return obj[arg];
}