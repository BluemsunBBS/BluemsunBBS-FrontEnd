import style from "./index.module.css"

export default function LikeNotification() {

    const NoMessage = () => {
        return (
            <div className={style.noMessageBox}>

            </div>
        )
    }

    return (
        <div>
            <NoMessage />
        </div>
    );
}