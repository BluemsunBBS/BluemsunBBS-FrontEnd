import style from './index.module.css';
import { useNavigate } from 'react-router';

const navigate = useNavigate();
export default function EveryBlock(props) {
    const board = props.board;
    var uri = "http://bbs.wyy.ink:8080/images/" + board.img;
    const handleLink = (id)=>{
        navigate(`/board/${id}`);
      }
    return (
        <div className={style.msgBox} onClick={props.onClick}>
            <img className={style.boardImg} src={uri} onClick={()=>{handleLink(board.id)}}></img>
            <div className={style.text1}>{board.name}</div>
            <span className={style.des}>{board.description}</span>
            <button className={style.btn1} onClick={()=>props.onDelete(board.id)}>删除版块</button>
            <button className={style.btn1}>管理版主</button>
        </div>
    )
}