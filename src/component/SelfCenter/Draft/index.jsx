import NoMessage from "../NoMessage"
import { useEffect, useState } from "react";
import { message, notification } from "antd";
import EveryDraft from './../EveryDraft';
import { http } from "../../../utils/http";
// import { getUserInfo } from './../../utils/func.js'
// import './../../utils/func.js'
import { useNavigate, useParams } from 'react-router';

export default function Draft() {

    const userParams = useParams();
    console.log(userParams);
    // const navigate = useNavigate();

    const [pager, setPager] = useState({
        page: 1,
        size: 10,
    });

    const APIResult = {
        page: 0,
        size: 0,
        rows: [],
        total: 0
    }

    const [data, setData] = useState(APIResult);
    async function fetchList(pager) {
        let res = await http.get(`/article/draft/list`,{
            params: {
                page: pager.page,
                size: pager.size
            }
        });
        if (res.code != 0) {
            message.error(res.msg);
            setData(APIResult);
        } else {
            setData(res.data);
        }
    }

    useEffect(() => {
        fetchList(pager);
    }, [pager]);
    return (
        <div>
            {data.page == 0 ? (<></>) : (
                (data && data.total != 0) ? (
                    data.rows.map((board) => (
                        <EveryDraft key={board.id} board={board} />
                    ))
                ) : (
                    <NoMessage />
                )
            )}
        </div>
    );
}