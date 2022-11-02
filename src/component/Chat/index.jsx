import { MessageTwoTone } from "@ant-design/icons";
import { message } from "antd";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../utils/func";
import { http } from "../../utils/http";
import ChatDetail from "./ChatDetail";
import style from "./index.module.css"

export default function Chat() {

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        async function update() {
            setUserList(await fetchUserList());
        }
        update();
    }, []);

    async function fetchUserList() {
        let res = await http.get(`/friend/friendList/${getUserInfo("id")}`, {
            params: {
                page: 1,
                size: 999
            }
        });
        if (res.code != 0) {
            message.error("获取用户列表失败");
            return null;
        }
        return res.data.rows;
    }

    return (
        <div className={style.chatBox}>
            <div className={style.userList}>
                <span style={{
                    fontSize: "20px",
                    fontWeight: "bolder",
                }}>
                    <MessageTwoTone />&nbsp;&nbsp;个人私信
                </span>
                {userList.length != 0 ? (
                    userList.map((user) => {
                        <UserBlock key={user.id} user={user} />
                    })
                ) : (<></>)}
            </div>
            <div className={style.chatDetail}>
                <ChatDetail />
            </div>
        </div>
    );
}