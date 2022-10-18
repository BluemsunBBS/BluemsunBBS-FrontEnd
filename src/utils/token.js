import {decode as base64_decode, encode as base64_encode} from 'base-64';

const t = localStorage.getItem("token");
export function setToken(t){
    var param = t.split(".");
    var obj = JSON.parse(base64_decode(param[1]));
    obj=JSON.parse(obj.sub)
    return(obj);
}