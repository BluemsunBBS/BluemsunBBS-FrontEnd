import imgurl from "./../img/1.jpg";
import './Nav.css';

function Nav() {
    const url = imgurl;
    return (
        <div className="navContainer">
            <span className='bbsTitle'>BluemsunBBS</span>
            
            <button className="navBtn" id="regis">创建新账户</button>
            <button className="navBtn">登录</button>
            <span className="blockBox">
                <img src={url} className="photo"></img>
                <span className="hello">你好，陌生人</span>
            </span>
            
        </div>
    )
}

export default Nav;