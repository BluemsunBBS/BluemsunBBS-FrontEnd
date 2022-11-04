import { Avatar } from "antd";
import { getUserInfo } from "../../../utils/func";
import style from "./index.module.css"

export default function MessageBlock(props) {

    const msg = props.message;
    const user = props.user;

    return (
        <div className={style.messageBlock}>
            <Avatar size={40} src={`http://bbs.wyy.ink:8080/images/${user.avatar_uri}`} />
            <span className={style.nickName}>{msg.fromUser == user.id ? user.nickname : getUserInfo("nickname")}</span>
            <div className={style.messageBubble}>
                {msg.text}
            </div>
        </div>
    );
}