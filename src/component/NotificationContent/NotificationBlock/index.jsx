import style from './index.module.css';

export default function NotificationBlock(props) {
    const notification = props.notification;
    var html = notification.text;

    return (

        <div className={style.notificationBox}>
            <div className={style.text1} 
                 dangerouslySetInnerHTML={{
                    __html: html
                 }}
                 >
            </div>
            <div className={style.text2}>
                {notification.notice_time}
            </div>
        </div>

    )
}