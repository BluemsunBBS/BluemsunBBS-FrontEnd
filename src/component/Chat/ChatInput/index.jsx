import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import style from "./index.module.css"

export default function ChatInput(props) {

    const [value, setValue] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleSend = (e) => {
        if (e.key == "Enter" && e.ctrlKey) {
            if (value == "") return;
            props.onSend({
                text: value,
                toUser: props.user.id
            });
            setTimeout(() => {
                setValue("");
            }, 3);
        }
    }

    return (
        <div className={style.inputBox}>
            <TextArea
                style={{
                    height: "105px",
                    margin: "20px",
                    width: "860px",
                    resize: "none"
                }}
                onChange={handleChange}
                bordered={false}
                onKeyDown={handleSend}
                value={value}
            />
            <span
                style={{
                    marginRight: "20px",
                    color: "#c2c8d1"
                }}
            >按Enter键发送</span>
        </div>
    );
}