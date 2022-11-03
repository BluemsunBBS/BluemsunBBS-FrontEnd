import style from "./index.module.css"

export default function MessageBlock(props) {

    const msg = props.message;

    return (
        <div className={style.messageBlock}>
            {msg.text}
        </div>
    );
}