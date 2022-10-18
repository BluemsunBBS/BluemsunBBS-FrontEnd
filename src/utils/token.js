import {decode as base64_decode, encode as base64_encode} from 'base-64';

const token = localStorage.getItem("token");
function setToken(){
    const param = token.split(".");
    const obj = base64_decode(param[1]);
    return(obj);
}