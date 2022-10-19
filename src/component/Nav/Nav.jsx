import imgurl from "./../../img/file.jpg";
import logo from './../../img/logo.jpg'
import { Button, Menu } from "antd";
import './Nav.css';
import { Content } from "antd/lib/layout/layout";
import { getUserInfo } from "../../utils/func";

export default function Nav(props) {
    var img = "http://bbs.wyy.ink:8080/images/" + getUserInfo("avatar_uri");
    var bbsurl = logo;
    var nickname = getUserInfo("nickname");

    const logined = [
        {
            label: (
                <div style={{minWidth: 170}}>
                    <img src={img} className="photo"></img>
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

    const guest = [
        {
            label: (
                <div style={{width: 100, height: 60}}>
                    <Button type="primary" className="login">登录 | 注册</Button>
                </div>
            ),
            key: 'login'
        }
    ];

    var handleClick = e => {
        if (e.key == "logout") {
            localStorage.removeItem("token");
            localStorage.removeItem("data");
            window.location.href = "/login";
        }
        if (e.key == "login") {
            window.location.href = "/login";
        }
    }

    var item = () => {
        if (localStorage.getItem("token")) {
            return logined;
        } else {
            return guest;
        }
    }

    return (
        <div className="navContainer">
            <img src={bbsurl} className="logo"/>
            <span className='bbsTitle' onClick={()=>{window.location.href="/home"}}>BluemsunBBS</span>
            
            {/* <button className="navBtn" id="regis" onClick={()=>{window.location.href="/login"}}>创建新账户</button>
            <button className="navBtn" onClick={()=>{window.location.href="/login"}}>登录</button> */}
            <span className="blockBox">
                <Menu mode="horizontal" onClick={handleClick} items={item()} style={{minWidth: 0, flex: "auto"}} />
            </span>
            
        </div>
    )
}

