import style from './index.module.css'
import { Navigate, useNavigate } from 'react-router';

export default function EveryFans(props) {
    const navigate = useNavigate();
    console.log(props);
    const board = props.board;
    var uri = "http://bbs.wyy.ink:8080/images/" + board.avatar_uri;
    const handleClick = () =>{
        navigate(`user/${board.id}`);
    }
    return (

        <div className={style.msgBox} onClick={handleClick}>
            <img className={style.boardImg} src={uri}></img>
            <div className={style.text1}>{board.nickname}</div>
            <button className={style.btn1}>关注</button>
        </div>

    )
}