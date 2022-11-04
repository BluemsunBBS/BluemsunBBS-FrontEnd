import { Avatar } from "antd";
import { getUserInfo } from "../../../utils/func";
import style from "./index.module.css"

export default function MessageBlock(props) {

    const msg = props.message;
    const user = props.user;
    const avatarUrl = msg.fromUser == user.id ? user.avatar_uri : getUserInfo("avatar_uri");

    return (
        <div>
            {(msg.fromUser == user.id) ? (<div className={style.messageBlock}>
                <div className={style.imgBox}>
                    <Avatar size={50} src={`http://bbs.wyy.ink:8080/images/${avatarUrl}`} />
                </div>
                <div className={style.box}>
                    <div className={style.nickName}>{msg.fromUser == user.id ? user.nickname : getUserInfo("nickname")}</div>
                    <div className={style.messageBubble}>
                        <p className={style.text}>{msg.text}</p>
                    </div>
                </div></div>


            ) : (<div className={style.messageBlock1}>
                <div className={style.box1}>
                    <div className={style.nickName1}>{msg.fromUser == user.id ? user.nickname : getUserInfo("nickname")}</div>
                    <div className={style.messageBubble}>
                        <p className={style.text1}>{msg.text}</p>
                    </div>
                </div>
                <div className={style.imgBox}>
                    <Avatar size={50} src={`http://bbs.wyy.ink:8080/images/${avatarUrl}`} />
                </div>
                </div>)}
        </div>

    )
}