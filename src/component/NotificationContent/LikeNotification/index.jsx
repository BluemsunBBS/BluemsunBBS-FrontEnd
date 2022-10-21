import style from "./index.module.css"
import NoMessage from "../NoMessage"
import { useEffect, useState } from "react";
import { message, notification } from "antd";
import NotificationBlock from "../NotificationBlock";
import { http } from "../../../utils/http";

export default function LikeNotification() {

    const [pager, setPager] = useState({
        page: 1,
        size: 10
    });

    const APIResult = {
        page: 0,
        size: 0,
        rows: [],
        total: 0
    }

    const [data, setData] = useState(APIResult);

    async function fetchNotification(pager) {
        let res = await http.get(`/message/list`,{
            params: {
                page: pager.page,
                size: pager.size,
                category: "like"
            }
        });
        if (res.code != 0) {
            message.error(res.msg);
            setData(null);
        } else {
            setData(res.data);
        }
    }

    useEffect(() => {
        fetchNotification(pager);
    }, [pager]);

    return (
        <div>
            {(data != null && data.total != 0) ? (
                data.rows.map((notification) => (
                    <NotificationBlock notification={notification} />
                ))
            ) : (
                <NoMessage />
            )}
        </div>
    );
}