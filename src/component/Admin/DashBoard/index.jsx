import NavOfAdmin from "../NavOfAdmin";
import style from './index.module.css';
import uri from './../../../img/bgc.jpg';

export default function DashBoard() {
    return (
        <div className={style.root}>
            <NavOfAdmin />
            <div className={style.imgBox}>
                <div className={style.textBox}>
                    <div>欢迎来到管理员界面</div>
                </div>
                <img src={uri} className={style.img} />
            </div>
        </div>
    )
}