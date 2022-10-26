import { Menu } from "antd";
import { useEffect, useState } from "react";
import Nav from "../../component/Nav/Nav";
import style from "./index.module.css";
import './index.module.css';
import { getUserInfo } from './../../utils/func.js'
import './../../utils/func.js'
import FollowBlock from "../../component/SelfCenter/FollowBlock";

const items = [
    {
        label: '草稿箱',
        key: 'draft'
    },
    {
        label: '已发布文章',
        key: 'published'
    },
    {
        label: '已关注用户',
        key: 'focus-user'
    },
    {
        label: '我的粉丝',
        key: 'focused'
    },
    {
        label: '已关注版块',
        key: 'focus-block'
    }
]

export default function SelfCenter() {
    var userimg = getUserInfo("avatar_uri");
    userimg = 'http://bbs.wyy.ink:8080/images/' + userimg;

    const [current, setCurrent] = useState('focus-block');
    const handleClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    function NotificationContent() {
        switch (current) {
            case "draft":
                return "草稿箱";
            case "published":
                return "已发布文章";
            case "focus-user":
                return "已关注用户";
            case "focused":
                return "我的粉丝";
            case "focus-block":
                return <FollowBlock/>;
        }
    }

    return (
        <div className={style.root}>
            <Nav />
            <div className={style.box}>
                <div className={style.left}>
                    <div className={style.userBox}>
                        <img src={userimg} className={style.userImg}></img>
                        <span className={style.userContent}>
                            <div className={style.text1}>我是吴越洋</div>
                            <button className={style.btn1}>关注</button>
                            <button className={style.btn1}>私信</button>
                        </span>
                    </div>
                    <Menu
                        className={style.menu}
                        mode="horizontal"
                        onClick={handleClick}
                        selectedKeys={[current]}
                        items={items}
                    />
                    <div className={style.notificationContent}>
                        <NotificationContent />
                    </div>
                </div>
                <div className={style.right}>
                    <div>关于我的</div>
                    <div>被99人关注</div>
                    <div>我关注了99人</div>
                </div>

            </div>

        </div>
    )
}