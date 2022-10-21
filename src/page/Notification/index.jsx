import { Menu } from "antd";
import { useEffect, useState } from "react";
import LikeNotification from "../../component/LikeNotification";
import Nav from "../../component/Nav/Nav";
import style from "./index.module.css"

const items = [
    {
        label: '评论',
        key: 'reply'
    },
    {
        label: '点赞',
        key: 'like'
    },
    {
        label: '关注',
        key: 'follow'
    },
    {
        label: '私信',
        key: 'im'
    },
    {
        label: '系统消息',
        key: 'system'
    },
]

export default function Notification() {

    const [current, setCurrent] = useState('reply');
    const handleClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    function NotificationContent() {
        switch (current) {
            case "reply":
                return "reply";
            case "like":
                return <LikeNotification />;
            case "follow":
                return "follow";
            case "im":
                return "im";
            case "system":
                return "system";
        }
    }

    return (
        <div className={style.root}>
            <Nav />
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
    )
}