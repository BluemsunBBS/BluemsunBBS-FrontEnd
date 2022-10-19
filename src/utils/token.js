import {
    decode as base64_decode,
    encode as base64_encode
} from 'base-64';

const t = localStorage.getItem("token");

function UrlDecode(zipStr) {
    var uzipStr = '';
    for (var i = 0; i < zipStr.length; i += 1) {
        var chr = zipStr.charAt(i);
        if (chr === '+') {
            uzipStr += ' ';
        } else if (chr === '%') {
            var asc = zipStr.substring(i + 1, i + 3);
            if (parseInt('0x' + asc) > 0x7f) {
                uzipStr += decodeURI('%' + asc.toString() + zipStr.substring(i + 3, i + 9).toString());
                i += 8;
            } else {
                uzipStr += AsciiToString(parseInt('0x' + asc));
                i += 2;
            }
        } else {
            uzipStr += chr;
        }
    }

    return uzipStr;
}
function StringToAscii(str){ 
    return str.charCodeAt(0).toString(16); 
}
  
function AsciiToString(asccode){ 
    return String.fromCharCode(asccode); 
}
export function setToken(t) {
    var param = t.split(".");
    var decodeparam = JSON.parse(base64_decode(param[1]))['sub'];
    var deparam = UrlDecode(decodeparam);
    var obj = JSON.parse(deparam);
    obj = JSON.stringify(obj);
    console.log(obj);
    return (obj);
}