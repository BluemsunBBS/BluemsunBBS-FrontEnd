import style from './index.module.css';
import { getUserInfo } from '../../../utils/func';

export default function NavOfAdmin(){
    var nickname = getUserInfo("nickname");
    return(
        <div className={style.topBox}>
            <button className={style.btn1} onClick={logout}>退出登录</button>
            <button className={style.btn1}>{nickname}</button>
        </div>
    )
}