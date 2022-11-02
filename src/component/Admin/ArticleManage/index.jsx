import style from './index.module.css';
import NavOfAdmin from '../NavOfAdmin';
import { Menu } from 'antd';
import { useEffect, useState } from "react";

const items = [
    {
        label: '未审核文章',
        key: 'unchecked'
    },
    {
        label: '已审核文章',
        key: 'checked'
    }
]
export default function ArticleManage() {
    const [current, setCurrent] = useState('unchecked');
    const handleClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    function NotificationContent() {
        switch (current) {
            case "unchecked":
                return "hijcklsjcklsamcklmsaclkmsklvjdvjmdlksvnwel";
            case "checked":
                return "ewjfmkwelnfmklwefnehiwfhnelwnfklwenvgewiovnklde";
        }
    }
    return (
        <div className={style.root}>
            <NavOfAdmin />
            <div className={style.contentBox}>
                <div>管理文章</div>
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

        </div>

    )
}