import Nav from "../../component/Nav/Nav";
import Search from "../../component/Search";
import { getUserInfo } from "../../utils/func";
import './setuserinfo.css'
import imgurl from './../../img/1.jpg'
import { useState } from "react";
import { http } from "../../utils/http";
import { openNotification } from "../../utils/notification";


export default () => {
    var userimg = imgurl;

    if (localStorage.getItem("token") == null) {
        window.location.href = "/";
    }

    var [nickname, setNickname] = useState(getUserInfo("nickname"));
    var [realname, setRealname] = useState(getUserInfo("realname"));
    var [password, setPassword] = useState(null);
    var [phone, setPhone] = useState(getUserInfo("phone"));

    var handleSubmit = async () => {
        var data = {
            nickname: nickname,
            realname: realname,
            password: password,
            phone: phone
        }
        var res = await http.put("/account/" + getUserInfo("id"), data);
        if (res == null || res.code == 2) {
            openNotification("error", "更新失败", "用户信息设置失败，请检查后重试");
        } else if (res.code == 0) {
            openNotification("success", "更新成功", res.data);
            var res = await http.get("/account/" + getUserInfo("id"));
            localStorage.setItem("data", JSON.stringify(res.data));
        }
    }

    var handleReset = () => {
        setNickname(getUserInfo("nickname"));
        setRealname(getUserInfo("realname"));
        setPhone(getUserInfo("phone"));
        setPassword(null);
    }

    return (
        <div>
            <Nav nickname={getUserInfo("nickname")} />
            <Search />
            <div className="setUserInfoBox">
                <div className="userTitle">设置用户信息</div>
                <div className="left">
                    <div className="inputBox">
                        <span className="text1">昵称</span>
                        <input
                            type="text"
                            className="input"
                            onChange={(e)=>{setNickname(e.target.value)}}
                            value={nickname}
                        ></input>
                    </div>
                    <div className="inputBox">
                        <span className="text1">真实姓名</span>
                        <input
                            type="text"
                            className="input"
                            onChange={(e)=>{setRealname(e.target.value)}}
                            value={realname}
                        ></input>
                    </div>
                    <div className="inputBox">
                        <span className="text1">密码</span>
                        <input
                            type="password"
                            className="input"
                            onChange={(e)=>{setPassword(e.target.value)}}
                            value={password}
                        ></input>
                    </div>
                    <div className="inputBox">
                        <span className="text1">手机号</span>
                        <input
                            type="text"
                            className="input"
                            onChange={(e)=>{setPhone(e.target.value)}}
                            value={phone}
                        ></input>
                    </div>
                    <button className="btn" onClick={handleSubmit}>提交</button>
                    <button className="btn" onClick={handleReset}>重置</button>
                </div>
                <div className="right">
                    <img src={userimg} className="userImg"></img>
                    <div className="imgTitle">我的头像</div>
                </div>



            </div>
        </div>
    )



};