import style from './index.module.css';

export default function NotificationBlock(props) {

    const notification = props.notification;

    console.log(notification);

    return (
        <>
            <div className={style.notificationBox}>
                <div className={style.text1}>
                    {notification.text}
                </div>
                <div className={style.text2}>
                    {notification.notice_time}
                </div>
            </div>
        </>
    )
}