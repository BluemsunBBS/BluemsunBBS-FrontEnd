import style from './index.module.css';
import { useNavigate } from 'react-router';
import { http } from '../../utils/http';
import { message } from 'antd';
import { useParams } from 'react-router';
import { getUserInfo } from '../../utils/func';

export default function EveryHost(props) {
    const useparams = useParams();
    var logUserId = getUserInfo("id");
    const navigate = useNavigate();
    console.log(props);
    const board = props.board;
    var uri = "http://bbs.wyy.ink:8080/images/" + board.avatar_uri;
    const handleClick = ()=>{
        navigate(`user/${board.id}`);
    }
    // async function handleBan() {
    //     var res = await http.delete(`/account/ban/${board.id}`);
    //     if (res.code != 0) {
    //         message.error(res.msg);
    //     } else {
    //         message.success("封禁成功！");
    //         fetchList();
    //     }
    // }
    return (

        <div className={style.msgBox}>
            <img className={style.boardImg} src={uri} onClick={handleClick}></img>
            <div className={style.text1}>{board.nickname}</div>
            <button className={style.btn1} onClick={()=>props.onBan(board.id)}>封禁用户</button>
        </div>

    )
}