import { Menu } from "antd";
import { useEffect, useState } from "react";
import Nav from "../../component/Nav/Nav";
import style from "./index.module.css";
import './index.module.css';
import { getUserInfo } from './../../utils/func.js'
import './../../utils/func.js'
import FollowBlock from "../../component/SelfCenter/FollowBlock";
import { LikeTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { http } from '../../utils/http'

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
    const userParams = useParams();
    console.log(userParams);
    // const navigate = useNavigate();
    const [user, setUser] = useState({
        nickname: "昵称",
        avatar_uri: ''
    });

    useEffect(() => {
        fetchUser(userParams);
    }, [userParams]);

    async function fetchUser(userParams) {
        var res = await http.get(`/account/${userParams.id}`);
        console.log(res.data.nickname);
        if (res.code != 0) {
            message.error(res.msg);
        } else {
            setUser(res.data);
        }
    }

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
                return <FollowBlock />;
        }
    }

    return (
        <div className={style.root}>
            <Nav />
            <div className={style.box}>
                <div className={style.left}>
                    <div className={style.userBox}>
                        <img src={`http://bbs.wyy.ink:8080/images/${user.avatar_uri}`}
                            className={style.userImg}></img>
                        <span className={style.userContent}>
                            <div className={style.text1}>{user.nickname}</div>
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
                    <div className={style.text2}>关于我的</div>
                    <div>
                        <SmileTwoTone twoToneColor="#7952b3" className={style.icon} />
                        <div className={style.text3}>被99人关注</div>
                    </div>
                    <div>
                        <LikeTwoTone twoToneColor="#7952b3" className={style.icon} />
                        <div className={style.text3}>我关注了99人</div>
                    </div>

                </div>

            </div>

        </div>
    )
}