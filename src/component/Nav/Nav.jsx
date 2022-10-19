import imgurl from "./../../img/1.jpg";
import logo from './../../img/logo.jpg'
import { Menu } from "antd";
import './Nav.css';

export default function Nav(props) {
    var url = imgurl;
    var bbsurl = logo;
    var nickname = '陌生人';

    if(props.nickname !== null && props.nickname !== undefined){
        nickname = props.nickname;
    }

    const logined = [
        {
            label: (
                <div>
                    <img src={url} className="photo"></img>
                    <span className="hello">你好，{nickname}</span>
                </div>
            ),
            key: 'menu',
            children: [
                {
                    label: (
                        <a href="/setUserInfo">编辑个人资料</a>
                    ),
                    key: "setUserInfo"
                },
                {
                    label: "退出登录",
                    key: "logout"
                }
            ]
        }
    ];

    var handleClick = e => {
        if (e.key == "logout") {
            localStorage.removeItem("token");
            localStorage.removeItem("data");
            window.location.href = "/login";
        }
    }

    return (
        <div className="navContainer">
            <img src={bbsurl} className="logo"/>
            <span className='bbsTitle' onClick={()=>{window.location.href="/home"}}>BluemsunBBS</span>
            
            {/* <button className="navBtn" id="regis" onClick={()=>{window.location.href="/login"}}>创建新账户</button>
            <button className="navBtn" onClick={()=>{window.location.href="/login"}}>登录</button> */}
            <span className="blockBox">
                <Menu mode="horizontal" onClick={handleClick} items={logined} style={{minWidth: 200}} />
            </span>
            
        </div>
    )
}

