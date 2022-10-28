import style from './index.module.css'
import { useNavigate } from 'react-router';

export default function EveryDraft(props) {
    const navigate = useNavigate();
    console.log(props);
    const board = props.board;
    var uri = "http://bbs.wyy.ink:8080/images/" + board.avatar_uri;
    const handleClick = () =>{

        navigate(`/write/${board.id}`);
    }
    return (

        <div className={style.msgBox} >
            <div className={style.text1} onClick={handleClick}>{board.title}</div>
        </div>
    )
}