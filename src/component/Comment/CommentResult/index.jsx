import { useEffect, useState } from "react";
import CommentBlock from "../CommentBlock";
import CommentEditor from "../CommentEditor";
import style from "./index.module.css";

export default function CommentResult(props) {

    const [isReplies, setReplies] = useState([]);

    useEffect(() => {
        setReplies(props.comments.rows.map((comment) => ({
            id: comment.id,
            state: false,
            sonReplies: comment.replies.map((sonComment) => ({
                id: sonComment,
                state: false,
                sonReplies: []
            }))
        })));
    }, [props.comments]);

    const handleReply = (id, state) => {
        var replies = props.comments.rows.map((comment) => ({
            id: comment.id,
            state: false,
            sonReplies: comment.replies.map((sonComment) => ({
                id: sonComment.id,
                state: false,
                sonReplies: []
            }))
        }));
        if (state) {
            for (let i = 0; i < replies.length; i++) {
                if (replies[i].id == id) {
                    replies[i].state = true;
                    break;
                }
                let flag = false;
                for (let j = 0; j < replies[i].sonReplies.length; j++) {
                    if (replies[i].sonReplies[j].id == id) {
                        replies[i].sonReplies[j].state = true;
                        flag = true;
                        break;
                    }
                }
                if (flag) break;
            }
        }
        setReplies(replies);
    }

    return (
        <div className={style.commentBox} id="comment">
            <CommentEditor
                article={props.article}
                onSubmit={props.onSubmit}
                mode="article"
            />
            {props.comments.total > 0 ? (
                <span className={style.titleText}>全部评论 {props.comments.total}</span>
            ) : (<></>)}
            {props.comments && props.comments.total != 0 ? (
                props.comments.rows.map((comment, idx) => (
                    <CommentBlock
                        key={comment.id}
                        comment={comment}
                        isReply={isReplies[idx]}
                        onReply={(id, state)=>handleReply(id, state)}
                        onSubmit={props.onSubmit}
                    />
                ))
            ) : (<></>)}
        </div>
    );
}