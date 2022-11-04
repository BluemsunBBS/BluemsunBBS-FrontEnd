import { MessageTwoTone } from "@ant-design/icons";
import { message } from "antd";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../utils/func";
import { http } from "../../utils/http";
import { closeWebSocket, createWebSocket } from "../../utils/websocket";
import ChatDetail from "./ChatDetail";
import style from "./index.module.css"
import UserBlock from "./UserBlock";

export default function Chat() {

    const [userList, setUserList] = useState([]);
    const [selectUser, setSelectUser] = useState();
    const [messageMap, setMessageMap] = useState(()=>{});

    useEffect(() => {
        async function update() {
            setUserList(await fetchUserList());
        }
        update();
    }, []);

    const handleMessage = (msg) => {
        try {
            msg = JSON.parse(msg);
        } catch {
            console.log("msg解析错误：" + msg);
            return;
        }
        var newMessageMap = { ...messageMap };
        if (msg instanceof Array) {
            for (let i = 0; i < msg.length; i++) {
                let message = msg[i];
                if (!newMessageMap[message.fromUser]) {
                    newMessageMap[message.fromUser] = [];
                }
                newMessageMap[message.fromUser].push(message);
            }
        } else {
            if (!newMessageMap[msg.fromUser]) {
                newMessageMap[msg.fromUser] = [];
            }
            newMessageMap[msg.fromUser].push(msg);
        }
        setMessageMap(()=>newMessageMap);
    }

    useEffect(() => {
        let url = `ws://localhost:8080/im?userId=${getUserInfo("id")}`;
        createWebSocket(url, handleMessage);
        return () => {
            closeWebSocket();
        }
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

    const handleSelect = (user) => {
        setSelectUser(user);
        console.log(user);
    }

    return (
        <div className={style.chatBox}>
            <div className={style.userList}>
                <p style={{
                    fontSize: "20px",
                    fontWeight: "bolder",
                    margin: "15px 0 15px 10px"
                }}>
                    <MessageTwoTone />&nbsp;&nbsp;个人私信
                </p>
                {userList.length != 0 ? (
                    userList.map((user) => (
                        <UserBlock key={user.id} user={user} onClick={()=>handleSelect(user)} />
                    ))
                ) : (<></>)}
            </div>
            {selectUser ? (
                <div className={style.chatDetail}>
                    <div className={style.detailNav}>
                        <p style={{
                            textAlign: "center",
                            fontSize: "18px",
                            fontWeight: "bolder",
                            color: "#666"
                        }}>
                            {selectUser.nickname ? selectUser.nickname : selectUser.username}
                        </p>
                    </div>
                    <ChatDetail 
                        messageList={messageMap[selectUser.id]} 
                        user={selectUser}
                    />
                </div>
            ) : (<></>)}
            
        </div>
    );
}