import { Avatar, Button, Comment, Form, List, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import style from "./index.module.css"
import imgUri from "../../../img/1.jpg"
import { getUserInfo } from "../../../utils/func";

const Editor = ({ onChange, onSubmit, submitting, value, style }) => (
    <>
        <Form.Item>
            <TextArea style={style} rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                评论
            </Button>
        </Form.Item>
    </>
);

export default function CommentEditor(props) {

    const onSubmit = props.onSubmit;
    var mode = props.mode;
    if (!mode) mode = "article"
    var articleId;
    var replyId;
    if (mode == 'article') articleId = props.article.id;
    else replyId = props.reply.reply_id ? props.reply.reply_id : props.reply.id;

    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');

    const avatar = getUserInfo("avatar_uri");

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = () => {
        var newComment;
        if(!value){
            message.info("评论不能为空！");
            return;
        }
        if (mode != 'article') {
            newComment = {
                text: `${props.reply.user.nickname}||${value}`
            }
        } else {
            newComment = {
                text: value
            }
        }
        if (mode == 'article') {
            newComment.article_id = articleId;
        } else {
            newComment.reply_id = replyId;
        }
        setValue("");
        onSubmit(newComment);
    }

    return (
        <div className={style.editorBox}>
            <Comment
                style={props.style}
                avatar={<Avatar src={`http://bbs.wyy.ink:8080/images/${avatar}`} />}
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                    />
                }
            />
        </div>
    );
}