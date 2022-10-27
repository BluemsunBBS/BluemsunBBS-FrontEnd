import logo from './../../img/logo.jpg'
import { Button, Menu } from "antd";
import style from './Nav.module.css';
// import { Content } from "antd/lib/layout/layout";
import { getUserInfo } from "../../utils/func";
import { BellFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router';

export default function Nav(props) {
    var img = "http://bbs.wyy.ink:8080/images/" + getUserInfo("avatar_uri");
    var userid = getUserInfo("id");
    var bbsurl = logo;
    const navigate = useNavigate();

    const logined = [
        {
            label: (
                <div style={{width: 40 }}>
                    <img src={img} className={style.photo}></img>
                    {/* <span className={style.hello}>你好，{nickname}</span> */}
                </div>
            ),
            key: 'menu',
            children: [
                {
                    label: "个人中心",
                    key: "selfCenter"
                },
                {
                    label: "编辑个人资料",
                    key: "setUserInfo"
                },
                {
                    label: "发布文章",
                    key: "addArticle"
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
                <div style={{width: 100, height: 60}} className={style.loginBtnBox}>
                    <Button type="primary" className={style.login}>登录 | 注册</Button>
                </div>
            ),
            key: 'login'
        }
    ];

    var handleClick = e => {
        if (e.key == "logout") {
            localStorage.removeItem("token");
            localStorage.removeItem("data");
            navigate("/login");
        }
        if (e.key == "login") {
            navigate("/login");
        }
        if (e.key == "addArticle") {
            window.open("/write");
        }
        if (e.key == "setUserInfo") {
            navigate("/setUserInfo");
        }
        if (e.key == "selfCenter") {
            navigate("/user/"+userid);
        }
    }

    var item = () => {
        if (localStorage.getItem("token")) {
            return logined;
        } else {
            return guest;
        }
    }

    function NotificationBell() {
        if (localStorage.getItem("token")) {
            return (
                <div 
                    className={style.blockBox}
                    style={{marginRight: '20px', cursor: 'pointer'}}
                    onClick={()=>{navigate("/notification")}}
                >
                    <BellFilled className={style.notification} style={{fontSize: '25px', color: '#f0f0f0', lineHeight: '70px'}}/>
                </div>
            )
        }
    }

    return (
        <div className={style.navContainer}>
            <img src={bbsurl} className={style.logo}/>
            <span className={style.bbsTitle} onClick={()=>{navigate('/')}}>BluemsunBBS</span>
            
            {/* <button className={style.navBtn} id="regis" onClick={()=>{window.location.href="/login"}}>创建新账户</button>
            <button className={style.navBtn} onClick={()=>{window.location.href="/login"}}>登录</button> */}
            <div className={style.blockBox}>
                <Menu className={style.menu} mode="horizontal" onClick={handleClick} items={item()} style={{minWidth: 0, flex: "auto"}} />
            </div>
            <NotificationBell/>
            
        </div>
    )
}

