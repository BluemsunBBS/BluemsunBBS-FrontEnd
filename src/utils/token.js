import {decode as base64_decode, encode as base64_encode} from 'base-64';

const t = localStorage.getItem("token");
export function setToken(t){
    var param = t.split(".");
    var obj = JSON.parse(base64_decode(param[1]));
    obj=JSON.parse(getUTF8Bytes(obj.sub))
    return(obj);
}

function getUTF8Bytes(str) {
    var bytes = [];
    var len = str.length;
    for (var i = 0; i < len; ++i) {
        var code = str.charCodeAt(i);
        if (code >= 0x10000 && code <= 0x10ffff) {
            bytes.push((code >> 18) | 0xf0); // 第一个字节
            bytes.push(((code >> 12) & 0x3f) | 0x80);
            bytes.push(((code >> 6) & 0x3f) | 0x80);
            bytes.push((code & 0x3f) | 0x80);
        } else if (code >= 0x800 && code <= 0xffff) {
            bytes.push((code >> 12) | 0xe0);
            bytes.push(((code >> 6) & 0x3f) | 0x80);
            bytes.push((code & 0x3f) | 0x80);
        } else if (code >= 0x80 && code <= 0x7ff) {
            bytes.push((code >> 6) | 0xc0);
            bytes.push((code & 0x3f) | 0x80);
        } else {
            bytes.push(code)
        }
    }

    return bytes;
}