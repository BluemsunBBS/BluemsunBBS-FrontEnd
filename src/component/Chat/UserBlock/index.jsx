import { Avatar } from "antd";
import style from "./index.module.css"

export default function UserBlock(props) {

    const user = props.user

    return (
        <div className={style.userBlock} onClick={props.onClick}>
            <Avatar
                size={60}
                src={`http://bbs.wyy.ink:8080/images/${user.avatar_uri}`}
                style={{
                    marginLeft: "5px"
                }}
            />
            <span
                style={{
                    margin: "20px",
                    top: "0"
                }}
            >
                {user.nickname ? user.nickname : user.username}
            </span>
        </div>
    );
}