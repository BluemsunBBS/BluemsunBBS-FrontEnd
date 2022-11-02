import { MessageTwoTone } from "@ant-design/icons";
import ChatDetail from "./ChatDetail";
import style from "./index.module.css"

export default function Chat() {
    return (
        <div className={style.chatBox}>
            <div className={style.userList}>
                <span style={{
                    fontSize: "20px",
                    fontWeight: "bolder",
                }}>
                    <MessageTwoTone />&nbsp;&nbsp;个人私信
                </span>

            </div>
            <div className={style.chatDetail}>
                <ChatDetail />
            </div>
        </div>
    );
}