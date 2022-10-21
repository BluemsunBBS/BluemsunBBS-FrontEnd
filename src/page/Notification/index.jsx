import { Menu } from "antd";
import { useState } from "react";
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

    const [current, setCurrent] = useState('mail');
    const handleClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <>
            <Nav />
            <Menu className={style.menu} mode="horizontal" onClick={handleClick} selectedKeys={[current]} items={items} />
        </>
    )
}