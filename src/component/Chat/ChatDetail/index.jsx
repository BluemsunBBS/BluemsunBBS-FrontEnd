import MessageBlock from "../MessageBlock";
import style from "./index.module.css"

export default function ChatDetail(props) {

    const messageList = props.messageList;
    const user = props.user;

    return (
        <>
            <div className={style.messageBox}>
                {messageList ? (messageList.map((msg) => (
                    <MessageBlock key={msg.id} message={msg} user={user}/>
                ))) : (<></>)}
            </div>
        </>
    );
}