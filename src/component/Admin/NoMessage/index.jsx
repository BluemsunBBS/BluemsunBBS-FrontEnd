import notFoundImg from "../../../img/notfound.svg"
import style from "./index.module.css"

const NoMessage = () => {
    return (
        <div className={style.noMessageBox}>
            <img src={notFoundImg} className={style.notFoundImg}></img>
            <div className={style.notFoundText}>暂无消息</div>
        </div>
    )
}

export default NoMessage;