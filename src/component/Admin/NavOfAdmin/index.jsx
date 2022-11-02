import style from './index.module.css';
import { getUserInfo } from '../../../utils/func';
import { useNavigate } from 'react-router';

export default function NavOfAdmin(){
    const navigate = useNavigate();
    var nickname = getUserInfo("nickname");
    const logout =()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("data");
        navigate(`/login`);
    }
    return(
        <div className={style.topBox}>
            <button className={style.btn1} onClick={logout}>退出登录</button>
            <button className={style.btn1}>{nickname}</button>
        </div>
    )
}