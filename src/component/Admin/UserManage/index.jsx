import style from './index.module.css';
import NavOfAdmin from '../NavOfAdmin';
import { useEffect, useState } from "react";
import { message, notification } from 'antd';
import { http } from '../../../utils/http';
import { useNavigate } from 'react-router';
import EveryPerson from '../EveryPerson';

export default function UserManage() {
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
        let res = await http.get(`/account/`, {
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
        <div className={style.root}>
            <NavOfAdmin />
            <div className={style.contentBox}>
                <div className={style.title}>管理用户</div>
                <div className={style.btnBox}>
                    <button className={style.btn1}>查看未封禁用户</button>
                    <button className={style.btn1}>查看封禁用户</button>
                </div>

                {data.page == 0 ? (<></>) : (
                    (data && data.total != 0) ? (
                        data.rows.map((board) => (
                            <EveryPerson key={board.id} board={board} />
                        ))
                    ) : (
                        <></>
                    )
                )}
            </div>

        </div>


    )
}