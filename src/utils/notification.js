
import { notification } from 'antd';

export function openNotification(type, msg, des, duration=4) {
    notification[type]({
        message: msg,
        description: des,
        duration: duration
    });
};