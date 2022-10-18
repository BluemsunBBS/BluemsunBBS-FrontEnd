import {decode as base64_decode, encode as base64_encode} from 'base-64';

const t = localStorage.getItem("token");
function setToken(t){
    const param = t.split(".");
    const obj = base64_decode(param[1]);
    return(obj);
}