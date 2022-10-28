import style from './index.module.css'

export default function EveryPublished(props) {
    console.log(props);
    const board = props.board;
    var uri = "http://bbs.wyy.ink:8080/images/" + board.avatar_uri;
    return (

        <div className={style.msgBox} >
            <div className={style.text1}>{board.title}</div>
        </div>

    )
}