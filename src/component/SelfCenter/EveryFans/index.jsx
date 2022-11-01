import style from './index.module.css'
import { Navigate, useNavigate } from 'react-router';
import { http } from '../../../utils/http';
import { message } from 'antd';
import { useParams } from 'react-router';
import { getUserInfo } from '../../../utils/func';

export default function EveryFans (props) {
    const useparams = useParams();
    var logUserId = getUserInfo("id");
    const navigate = useNavigate();
    console.log(props);
    const board = props.board;
    var uri = "http://bbs.wyy.ink:8080/images/" + board.avatar_uri;
    const handleClick = () => {
        navigate(`user/${board.id}`);
    }

    async function handleFollow() {
        var res = await http.post(`/friend/${board.id}`);
        if (res.code != 0) {
            message.error(res.msg);
        } else {
            message.success("关注成功！");
        }
    }

    return (
        <div className={style.msgBox}>
            <img className={style.boardImg} src={uri} onClick={handleClick}></img>
            <div className={style.text1}>{board.nickname}</div>
            {(useparams.id == logUserId.id)?(<button className={style.btn1} onClick={handleFollow}>关注</button>):(<></>)}
            
        </div>

    )
}