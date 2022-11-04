import { Avatar } from "antd";
import { getUserInfo } from "../../../utils/func";
import style from "./index.module.css"

export default function MessageBlock(props) {

    const msg = props.message;
    const user = props.user;
    const avatarUrl = msg.fromUser == user.id ? user.avatar_uri : getUserInfo("avatar_uri");

    return (
        <div className={style.messageBlock}>
            <Avatar src={`http://bbs.wyy.ink:8080/images/${avatarUrl}`} className={style.img}/>
            <span className={style.nickName}>{msg.fromUser == user.id ? user.nickname : getUserInfo("nickname")}</span>
            <div className={style.messageBubble}>
                <p className={style.text}>{msg.text}</p>
            </div>
        </div>
    );
}