import { useEffect } from "react";
import CommentBlock from "../CommentBlock";
import CommentEditor from "../CommentEditor";
import style from "./index.module.css";

export default function CommentResult(props) {

    return (
        <div className={style.commentBox}>
            <CommentEditor
                articleId={props.article.id}
                onSubmit={props.onSubmit}
                mode="article"
            />
            <span className={style.titleText}>全部评论 {props.comments.total}</span>
            {props.comments && props.comments.total != 0 ? (
                props.comments.rows.map((comment) => (
                    <CommentBlock
                        key={comment.id}
                        comment={comment}
                        onSubmit={props.onSubmit}
                    />
                ))
            ) : (<></>)}
        </div>
    );
}