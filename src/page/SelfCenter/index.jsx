import { Menu } from "antd";
import { useEffect, useState } from "react";
import Nav from "../../component/Nav/Nav";
import style from "./index.module.css";
import './index.module.css';
import { getUserInfo } from './../../utils/func.js'
import './../../utils/func.js'
import FollowBlock from "../../component/SelfCenter/FollowBlock";
import FollowPerson from "../../component/SelfCenter/FollowPerson";
import Fans from "../../component/SelfCenter/Fans";
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { http } from '../../utils/http'
import { Badge, message } from 'antd';

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

    const [user, setUser] = useState({
        nickname: "昵称",
        avatar_uri: ''
    });
    const [current, setCurrent] = useState('focus-block');
    const [follow, setFollow] = useState(0);
    const [fans, setFans] = useState(0);
    const [followed, setFollowed] = useState(false);
    useEffect(() => {
        fetchUser(userParams);
        fetchFollow(userParams);
        fetchFans(userParams);
    }, [userParams]);

    async function fetchUser(userParams) {
        var res = await http.get(`/account/${userParams.id}`);
        if (res.code != 0) {
            message.error(res.msg);
        } else {
            setUser(res.data);
        }
    }

    async function fetchFollow(userParams) {
        var res = await http.get(`/friend/countFollow/${userParams.id}`);
        console.log(res);
        if (res.code != 0) {
            message.error(res.msg);
        } else {
            setFollow(res.data);
        }
    }

    async function fetchFans(userParams) {
        var res = await http.get(`/friend/countFans/${userParams.id}`);
        console.log(res);
        if (res.code != 0) {
            message.error(res.msg);
        } else {
            setFans(res.data);
        }
    }

    const handleClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    const handleFollow = (state) => {
        async function fetchFollowed() {
            let res;
            if (state) res = await http.post(`/friend/${user.id}`);
            else res = await http.delete(`/friend/${user.id}`);
            if (res.code != 0) {
                message.error(res.msg);
                setFollowed(!state);
            } else {
                setFollowed(state);
            }
            res = await http.get(`/friend/countFans/${user.id}`);
            if (res.code == 0) {
                setFans(res.data);
            }
        }
        fetchFollowed();
    }

    function NotificationContent() {
        switch (current) {
            case "draft":
                return "草稿箱";
            case "published":
                return "已发布文章";
            case "focus-user":
                return <FollowPerson/>;
            case "focused":
                return <Fans />;
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
                            <button className={style.btn1}
                                onClick={() => handleFollow(!followed)}>
                                {(!followed) ? ("关 注") : ("取消关注")}
                            </button>
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
                    <div className={style.text2}>关于 {user.nickname}</div>
                    <div className={style.box1}>
                        <SmileTwoTone twoToneColor="#7952b3" className={style.icon} />
                        <div className={style.text3}>被 {fans} 人关注</div>
                    </div>
                    <div className={style.box1}>
                        <HeartTwoTone twoToneColor="#7952b3" className={style.icon} />
                        <div className={style.text3}>关注了 {follow} 人</div>
                    </div>

                </div>

            </div>

        </div>
    )
}