import style from './index.module.css';
import { useNavigate } from 'react-router';

export default function EveryBlock(props) {
    const Navigate = useNavigate();
    const board = props.board;
    var uri = "http://bbs.wyy.ink:8080/images/" + board.img;
    const handleLink = (id)=>{
        Navigate(`/board/${id}`);
      }
    return (
        <div className={style.msgBox} onClick={props.onClick}>
            <img className={style.boardImg} src={uri} onClick={()=>{handleLink(board.id)}}></img>
            <div className={style.text1}>{board.name}</div>
            <span className={style.des}>{board.description}</span>
        </div>
    )
}