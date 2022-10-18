import './token'

function getUserInfo(){
    const t = localStorage.getItem("token");
    const obj = this.setToken(t);
    return obj;
}