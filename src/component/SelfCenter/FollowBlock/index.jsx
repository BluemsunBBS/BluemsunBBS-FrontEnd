import NoMessage from "../NoMessage"
import { useEffect, useState } from "react";
import { message, notification } from "antd";
import EveryFollowBlock from "../EveryFollowBlock";
import { http } from "../../../utils/http";
// import { getUserInfo } from './../../utils/func.js'
// import './../../utils/func.js'
import { useNavigate, useParams } from 'react-router';

export default function FollowBlock() {

    const userParams = useParams();
    console.log(userParams);
    // const navigate = useNavigate();

    const [pager, setPager] = useState({
        page: 1,
        size: 10,
        userId:userParams.id
    });

    const APIResult = {
        page: 0,
        size: 0,
        rows: [],
        total: 0
    }

    const [data, setData] = useState(APIResult);

    async function fetchList(userParams,pager) {
        let res = await http.get(`/follow/listBoard/${userParams.id}`,{
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
        fetchList(userParams,pager);
    }, [userParams,pager]);

    return (
        <div>
            {data.page == 0 ? (<></>) : (
                (data && data.total != 0) ? (
                    data.rows.map((board) => (
                        <EveryFollowBlock key={board.id} board={board} />
                    ))
                ) : (
                    <NoMessage />
                )
            )}
        </div>
    );
}