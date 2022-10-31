import style from './index.module.css';
import { useNavigate } from 'react-router';

export default function EveryFollowBlock(props) {
    const navigate = useNavigate();
    const board = props.board;
    var uri = "http://bbs.wyy.ink:8080/images/" + board.img;
    const handleClick =() =>{
        navigate(`/user/${board.id}`);
    }
    return (
        <div className={style.msgBox} onClick={handleClick}>
            <img className={style.boardImg} src={uri}></img>
            <div className={style.text1}>{board.name}</div>
        </div>

    )
}