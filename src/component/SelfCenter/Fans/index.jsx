import NoMessage from "../NoMessage"
import { useEffect, useState } from "react";
import { message, notification } from "antd";
import EveryFans from "../EveryFans";
import EveryFriend from "../EveryFriend";
import { http } from "../../../utils/http";
import style from "./index.module.css"
// import { getUserInfo } from './../../utils/func.js'
// import './../../utils/func.js'
import { useNavigate, useParams } from 'react-router';

export default function Fans() {

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
    const [friendData, setFriendData] = useState(APIResult);
    async function fetchList(userParams,pager) {
        let res = await http.get(`/friend/fansList/${userParams.id}`,{
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
        res = await http.get(`/friend/friendList/${userParams.id}`, {
            params: {
                page: pager.page,
                size: pager.size
            }
        });
        if (res.code != 0) {
            message.error(res.msg);
            setFriendData(APIResult);
        } else {
            setFriendData(res.data);
        }
    }

    useEffect(() => {
        fetchList(userParams,pager);
    }, [userParams,pager]);

    async function handleFollow(id) {
        var res = await http.post(`/friend/${id}`);
        if (res.code != 0) {
            message.error(res.msg);
        } else {
            message.success("关注成功！");
            fetchList(userParams,pager);
        }
    }
    return (
        <div>
            {friendData.page == 0 ? (<></>) : (
                (friendData && friendData.total != 0) ? (
                    <div className={style.eachOther}>
                        {friendData.rows.map((board) => (
                            <EveryFriend key={board.id} board={board} />
                        ))}
                    </div>
                ) : (
                    <></>
                )
            )}
            {data.page == 0 ? (<></>) : (
                (data && data.total != 0) ? (
                    data.rows.map((board) => (
                        <EveryFans key={board.id} board={board} onFollow={handleFollow}/>
                    ))
                ) : (
                    <></>
                )
            )}
            {(data.total == 0 && friendData.total == 0)?(<NoMessage/>):(<></>)}
        </div>
    );
}