import { Avatar, Comment, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { getTimeDiff, getUserInfo } from "../../../utils/func";
import CommentEditor from "../CommentEditor";
import style from "./index.module.css"
import { useNavigate } from "react-router";

export default function CommentBlock(props) {
    const navigate = useNavigate();
    const state = (props.isReply ? props.isReply.state : false);

    const handleSubmit = (e) => {
        props.onReply(props.comment.id, false);
        props.onSubmit(e);
    }

    const content = props.comment.text.split("||");
    var reply_user, text;
    if (content.length == 1) {
        text = content[0];
    } else {
        reply_user = content[0];
        text = content[1];
    }

    const handleDelete = () => {
        props.onSubmit({
            delete: true,
            replyId: props.comment.id,
            mode: (props.comment.reply_id ? "reply" : "article")
        })
    }

    const handleReply = () => {
        props.onReply(props.comment.id, !state);
    }

    const handleClick = () => {
        navigate("/user/" + props.comment.user.id);
    }

    return (
        <div className={style.comment}>
            <Comment
                actions={[
                    <span key="comment-nested-reply-to" onClick={handleReply}>{state ? "取消回复" : "回复"}</span>,
                    props.comment.user_id == getUserInfo("id") ?
                        <span key="comment-nested-reply-to" onClick={handleDelete}>删除</span> :
                        (<></>)
                ]}
                author={
                    <>
                        <a href={`/user/${props.comment.user.id}`}>
                            {props.comment.user.nickname ? props.comment.user.nickname : props.comment.user.username}
                        </a> {reply_user ? ` 回复 ${reply_user}` : ''}
                    </>
                }
                avatar={<Avatar src={`http://bbs.wyy.ink:8080/images/${props.comment.user.avatar_uri}`}
                    onClick={handleClick} />}
                content={
                    <p className={style.content}>
                        {text}
                    </p>
                }
                datetime={
                    <Tooltip title={props.comment.reply_time}>
                        <span>{getTimeDiff(props.comment.reply_time)}</span>
                    </Tooltip>
                }
            >
                {state ? (
                    <CommentEditor
                        style={{ width: props.comment.reply_id ? '610px' : '660px' }}
                        onSubmit={handleSubmit}
                        reply={props.comment}
                        mode="reply"
                    />
                ) : (<></>)}
                {props.comment.replies ? (
                    props.comment.replies.map((comment, id) => (
                        <CommentBlock
                            key={comment.id}
                            comment={comment}
                            isReply={props.isReply ? props.isReply.sonReplies[id] : []}
                            onReply={(id, state) => props.onReply(id, state)}
                            onSubmit={props.onSubmit}
                        />
                    ))
                ) : (<></>)}
            </Comment>
        </div>
    );
}