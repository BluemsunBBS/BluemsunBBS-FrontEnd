import style from './index.module.css';
import NavOfAdmin from '../NavOfAdmin';

export default function BoardManage(){
    return(
        <div className={style.root}>
            <NavOfAdmin />
            <div className={style.contentBox}>
                <div className={style.title}>管理板块</div>
                <div className={style.btnBox}>
                    <button className={style.btn1}>查看未封禁用户</button>
                    <button className={style.btn1}>查看封禁用户</button>
                </div>
            </div>

        </div>
        
    )
}