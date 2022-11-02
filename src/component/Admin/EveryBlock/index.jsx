import style from './index.module.css';

export default function EveryFollowBlock(props) {
    const board = props.board;
    var uri = "http://bbs.wyy.ink:8080/images/" + board.img;
    
    return (
        <div className={style.msgBox} onClick={props.onClick}>
            <img className={style.boardImg} src={uri}></img>
            <div className={style.text1}>{board.name}</div>
        </div>
    )
}