import style from './index.module.css';
import NavOfAdmin from '../NavOfAdmin';

export default function UserManage() {
    return (
        <div className={style.root}>
            <NavOfAdmin />
            <div className={style.contentBox}>
                <div className={style.title}>管理用户</div>
            </div>

        </div>


    )
}