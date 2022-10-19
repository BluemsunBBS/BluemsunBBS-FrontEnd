import imgurl from "./../../img/1.jpg";
import logo from './../../img/logo.jpg'
import './Nav.css';

function Nav(props) {
    var url = imgurl;
    var bbsurl = logo;
    var nickname = '陌生人';
    if(props.nickname !== null && props.nickname !== undefined){
        nickname = props.nickname;
    }
    console.log(nickname);
    return (
        <div className="navContainer">
            <img src={bbsurl} className="logo"/>
            <span className='bbsTitle' onClick={()=>{window.location.href="/home"}}>BluemsunBBS</span>
            
            <button className="navBtn" id="regis" onClick={()=>{window.location.href="/login"}}>创建新账户</button>
            <button className="navBtn" onClick={()=>{window.location.href="/login"}}>登录</button>
            <span className="blockBox">
                <img src={url} className="photo" onClick={()=>{window.location.href="/setUserInfo"}}></img>
                <span className="hello">你好，{nickname}</span>
            </span>
            
        </div>
    )
}

export default Nav;