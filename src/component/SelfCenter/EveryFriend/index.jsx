import style from './index.module.css'

export default function EveryFriend(props) {
    console.log(props);
    const board = props.board;
    var uri = "http://bbs.wyy.ink:8080/images/" + board.avatar_uri;
    return (

        <div className={style.msgBox} >
            <img className={style.boardImg} src={uri}></img>
            <div className={style.text1}>{board.nickname}</div>
            <span className={style.text2}>已互关</span>
        </div>

    )
}