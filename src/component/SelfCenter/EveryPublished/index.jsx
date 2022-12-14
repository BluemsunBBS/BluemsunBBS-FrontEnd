import style from './index.module.css'
import { useNavigate, useParams } from 'react-router';
import { getUserInfo } from '../../../utils/func';

export default function EveryPublished(props) {
    const useparams = useParams();
    var logUserId = getUserInfo("id");
    const navigate = useNavigate();
    console.log(props);
    const board = props.board;
    var uri = "http://bbs.wyy.ink:8080/images/" + board.avatar_uri;
    const handleClick = () =>{
        navigate(`/article/${board.id}`);
    }
    const link = () =>{
        navigate(`/write/${board.id}`);
    }
    return (

        <div className={style.msgBox} >
            <div className={style.text1} onClick={handleClick}>{board.title}</div>
            {(useparams.id == logUserId)?(<button className={style.btn1} onClick={link}>编辑文章</button>):(<></>)}
            
            <div className={style.text2}>{board.text.substr(0, 200)}</div>
            <span className={style.text3}>{board.create_time}</span>
        </div>
    )
}