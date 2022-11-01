import style from './index.module.css';
import { useNavigate } from 'react-router';
import { http } from '../../../utils/http';
import { message } from 'antd';
import { useParams } from 'react-router';
import { getUserInfo } from '../../../utils/func';

export default function EveryFollowPerson(props) {
    const useparams = useParams();
    var logUserId = getUserInfo("id");
    const navigate = useNavigate();
    console.log(props);
    const board = props.board;
    var uri = "http://bbs.wyy.ink:8080/images/" + board.avatar_uri;
    const handleClick = ()=>{
        navigate(`user/${board.id}`);
    }
    return (

        <div className={style.msgBox} onClick={handleClick}>
            <img className={style.boardImg} src={uri}></img>
            <div className={style.text1}>{board.nickname}</div>
            {(useparams.id == logUserId.id)?(<button className={style.btn1} onClick={handleFollow}>取消关注</button>):(<></>)}
        </div>

    )
}