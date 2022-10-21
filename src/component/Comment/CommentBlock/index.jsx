import { Avatar, Comment, Tooltip } from "antd";
import { useState } from "react";
import { getTimeDiff, getUserInfo } from "../../../utils/func";
import CommentEditor from "../CommentEditor";
import style from "./index.module.css"

export default function CommentBlock(props) {

    const [reply, setReply] = useState(false);

    const handleReply = () => {
        const old = reply;
        setReply(!old);
    }

    const handleSubmit = (e) => {
        setReply(false);
        props.onSubmit(e);
    }

    const handleDelete = () => {
        props.onSubmit({
            delete: true,
            replyId: props.comment.id,
            mode: (props.comment.reply_id ? "reply" : "article")
        })
    }

    return (
        <div className={style.comment}>
            <Comment
                actions={[
                    <span key="comment-nested-reply-to" onClick={handleReply}>回复</span>,
                    props.comment.user_id==getUserInfo("id") ? 
                    <span key="comment-nested-reply-to" onClick={handleDelete}>删除</span> : 
                    (<></>)
                ]}
                author={<a href={`/user/${props.comment.user.id}`}>
                    {props.comment.user.nickname ? props.comment.user.nickname : props.comment.user.username}
                </a>}
                avatar={<Avatar src={`http://bbs.wyy.ink:8080/images/${props.comment.user.avatar_uri}`}/>}
                content={
                    <p className={style.content}>
                        {props.comment.text}
                    </p>
                }
                datetime={
                    <Tooltip title={props.comment.reply_time}>
                        <span>{getTimeDiff(props.comment.reply_time)}</span>
                    </Tooltip>
                }
            >
                {reply ? (
                    <CommentEditor
                        onSubmit={handleSubmit}
                        replyId={props.comment.reply_id ?
                        props.comment.reply_id :
                        props.comment.id}
                        mode="reply"
                    />
                ) : (<></>)}
                {props.comment.replies ? (
                    props.comment.replies.map((comment) => (
                        <CommentBlock
                            key={comment.id}
                            comment={comment}
                            onSubmit={props.onSubmit}
                        />
                    ))
                ) : (<></>)}
            </Comment>
        </div>
    );
}