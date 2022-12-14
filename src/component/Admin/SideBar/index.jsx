import { Avatar, Menu } from "antd";
import style from "./index.module.css";
import { getUserInfo } from "../../../utils/func";
import { ContainerOutlined, DashboardOutlined, SettingOutlined } from "@ant-design/icons";
import { useState } from "react";
import DashBoard from "./../DashBoard";
import UserManage from "./../UserManage";
import ArticleManage from "../ArticleManage";
import BoardManage from "./../BoardManage";

const items = [
    {
        label: "仪表盘",
        key: "dashboard",
        icon: <DashboardOutlined />
    },
    {
        label: "内容管理",
        key: "content",
        icon: <ContainerOutlined />,
        children: [
            {
                label: "文章管理",
                key: "articleManage",
            },
            {
                label: "用户管理",
                key: "userManage",
            },
            {
                label: "板块管理",
                key: "boardManage",
            }
        ]
    },
    {
        label: "网站设置",
        key: "setting",
        icon: <SettingOutlined />,
        children: [
            {
                label: "首页广告设置",
                key: "advertise"
            }
        ]
    }
]

export default function SideBar() {

    const imgUrl = `http://bbs.wyy.ink:8080/images/${getUserInfo("avatar_uri")}`;

    const [current, setCurrent] = useState("dashboard");

    const ManageContent = () => {
        switch (current) {
            case "dashboard":
                return <DashBoard />;
            case "articleManage":
                return <ArticleManage />;
            case "userManage":
                return <UserManage />;
            case "boardManage":
                return <BoardManage />;
        }
    }

    return (
        <>
            <div className={style.sideBarBox}>
                <Avatar
                    style={{
                        marginTop: "30px"
                    }}
                    size={100}
                    src={imgUrl}
                />
                <p style={{ marginTop: "20px", fontSize: "14px", color: "#fafafa" }}>欢迎您，{getUserInfo("nickname")}</p>

                <div className={style.navigationBar}>
                    {/* <p style={{textAlign: "left", fontSize: "13px", color: "#cacaca"}}>导航栏</p> */}
                    <Menu items={items} mode="inline" selectedKeys={[current]} onClick={(e) => setCurrent(e.key)} className={style.menu} />
                </div>

            </div>
            <div className={style.managecontent}>
                <ManageContent />
            </div>
        </>
    );
}