import Nav from "../../component/Nav/Nav";
import Search from "../../component/Search";
import { getUserInfo } from "../../utils/func";
import './setuserinfo.css'
import imgurl from './../../img/1.jpg'

export default () => {
    var userimg = imgurl;
    return (
        <div>
            <Nav nickname={getUserInfo("nickname")}/>
            <Search/>
            <div className="setUserInfoBox">
                <div className="userTitle">设置用户信息</div>
                <div className="left">
                    <div className="inputBox">
                        <span className="text1">昵称</span>
                        <input type="text" className="input" value={getUserInfo("nickname")}></input>
                    </div>
                    <div className="inputBox">
                        <span className="text1">真实姓名</span>
                        <input type="text" className="input" value={getUserInfo("realname")}></input>
                    </div>
                    <div className="inputBox">
                        <span className="text1">密码</span>
                        <input type="password" className="input" value={getUserInfo("password")}></input>
                    </div>
                    <div className="inputBox">
                        <span className="text1">手机号</span>
                        <input type="text" className="input" value={getUserInfo("phone")}></input>
                    </div>
                    <button className="btn">提交</button>
                    <button className="btn">重置</button>
                </div>
                <div className="right">
                 <img src={userimg} className="userImg"></img>
                 <div className="imgTitle">我的头像</div>
                </div>
                
                
                
            </div>
        </div>
    )

    

};