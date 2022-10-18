import imgurl from "./../../img/1.jpg";
import './Nav.css';

function Nav() {
    const url = imgurl;
    return (
        <div className="navContainer">
            <span className='bbsTitle' onClick={()=>{window.location.href="/home"}}>BluemsunBBS</span>
            
            <button className="navBtn" id="regis" onClick={()=>{window.location.href="/login"}}>创建新账户</button>
            <button className="navBtn" onClick={()=>{window.location.href="/login"}}>登录</button>
            <span className="blockBox">
                <img src={url} className="photo"></img>
                <span className="hello">你好，陌生人</span>
            </span>
            
        </div>
    )
}

export default Nav;