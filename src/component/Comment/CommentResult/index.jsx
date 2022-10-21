import CommentEditor from "../CommentEditor";
import style from "./index.module.css";

export default function CommentResult(props) {

    return (
        <div className={style.commentBox}>
            <CommentEditor />
        </div>
    );
}