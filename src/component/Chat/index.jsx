import { MessageTwoTone } from "@ant-design/icons";
import { message } from "antd";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../utils/func";
import { http } from "../../utils/http";
import useWebsocket from "../../utils/useWebsocket";
// import { closeWebSocket, createWebSocket, sendMessage, websocket } from "../../utils/websocket";
import ChatDetail from "./ChatDetail";
import ChatInput from "./ChatInput";
import style from "./index.module.css"
import UserBlock from "./UserBlock";

export default function Chat() {

    const [userList, setUserList] = useState([]);
    const [selectUser, setSelectUser] = useState();
    const [messageMap, setMessageMap] = useState({});
    const { wsData, readyState, closeWebSocket, reconnect, sendMessage } = useWebsocket({
        url: `ws://bbs.wyy.ink:8080/im?userId=${getUserInfo("id")}`,
        verify: true // 此参数控制是否有权限，请求该方法
    });

    useEffect(() => {
        async function update() {
            setUserList(await fetchUserList());
        }
        update();
    }, []);

    // const handleMessage = (msg) => {
    //     try {
    //         msg = JSON.parse(msg);
    //     } catch {
    //         console.log("msg解析错误：" + msg);
    //         return;
    //     }
    //     var newMessageMap = { ...messageMap };
    //     if (msg instanceof Array) {
    //         for (let i = 0; i < msg.length; i++) {
    //             let message = msg[i];
    //             let nowUser = message.fromUser == getUserInfo("id") ? message.toUser : message.fromUser;
    //             if (!newMessageMap[nowUser]) {
    //                 newMessageMap[nowUser] = [];
    //             }
    //             newMessageMap[nowUser].push(message);
    //         }
    //     } else {
    //         let nowUser = msg.fromUser == getUserInfo("id") ? msg.toUser : msg.fromUser;
    //         if (!newMessageMap[nowUser]) {
    //             newMessageMap[nowUser] = [];
    //         }
    //         newMessageMap[nowUser].push(msg);
    //     }
    //     setMessageMap(newMessageMap);
    // }

    // useEffect(() => {
    //     let url = `ws://localhost:8080/im?userId=${getUserInfo("id")}`;
    //     createWebSocket(url, receiveMessage);
    //     return () => {
    //         closeWebSocket();
    //     }
    // }, []);

    useEffect(() => {
        let msg = wsData;
        try {
            msg = JSON.parse(msg);
        } catch {
            console.log("msg解析错误：" + msg);
            return;
        }
        var newMessageMap = { ...messageMap };
        if (msg instanceof Array) {
            newMessageMap = [];
            for (let i = 0; i < msg.length; i++) {
                let message = msg[i];
                let nowUser = message.fromUser == getUserInfo("id") ? message.toUser : message.fromUser;
                if (!newMessageMap[nowUser]) {
                    newMessageMap[nowUser] = [];
                }
                newMessageMap[nowUser].push(message);
            }
        } else {
            let nowUser = msg.fromUser == getUserInfo("id") ? msg.toUser : msg.fromUser;
            if (!newMessageMap[nowUser]) {
                newMessageMap[nowUser] = [];
            }
            newMessageMap[nowUser].push(msg);
        }
        setMessageMap(newMessageMap);
    }, [wsData]);

    useEffect(() => {
        if (readyState.key == 1) {
            message.success("已连接到服务器");
        }
        if (readyState.key == 3) {
            message.error("连接已断开，3秒后重连");
            setTimeout(() => {
                reconnect();
            }, 3000);
        }
    }, [readyState]);

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

    const handleSend = (msg) => {
        console.log(msg);
        sendMessage(JSON.stringify(msg));
    }

    return (
        <div className={style.chatBox}>
            <div className={style.userList}>
                <p style={{
                    fontSize: "20px",
                    fontWeight: "bolder",
                    margin: "15px 0 15px 25px"
                }}>
                    <MessageTwoTone />&nbsp;&nbsp;个人私信
                </p>
                {userList.length != 0 ? (
                    userList.map((user) => (
                        <UserBlock key={user.id} user={user} onClick={() => handleSelect(user)} />
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
                    <ChatInput user={selectUser} onSend={handleSend} />
                </div>
            ) : (<></>)}

        </div>
    );
}