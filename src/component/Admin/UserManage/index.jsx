import style from './index.module.css';
import NavOfAdmin from '../NavOfAdmin';
import { useEffect, useState } from "react";
import { message, notification,Pagination} from 'antd';
import { http } from '../../../utils/http';
import { useNavigate } from 'react-router';
import EveryPerson from '../EveryPerson';
import EveryBanned from '../EveryBanned';
import NoMessage from '../NoMessage';

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
    const [state,setState] = useState(0);
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
    async function fetchBanList(pager) {
        let res = await http.get(`/account/ban/`, {
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

    const handlePageChange = (cur, size) => {
        setPager({
            page: cur,
            size: size
        });
    }
    const checkAll = () => {
        fetchList(pager);
        setState(0);
    }
    const checkBan = () => {
        fetchBanList(pager);
        setState(1);
    }
    async function banUser(id){
        let res = await http.delete(`/account/ban/${id}`);
        if(res.code != 0){
            message.error(res.msg);
        }else{
            message.success("封禁成功！");
            fetchList(pager);
        }
    }
    async function deBanUser(id){
        let res = await http.put(`/account/ban/${id}`);
        if(res.code != 0){
            message.error(res.msg);
        }else{
            message.success("解封成功！");
            fetchBanList(pager);
        }
    }
    return (
        <div className={style.root}>
            <NavOfAdmin />
            <div className={style.contentBox}>
                <div className={style.title}>管理用户</div>
                <div className={style.btnBox}>
                    <button className={style.btn1} onClick={checkAll}>查看未封禁用户</button>
                    <button className={style.btn1} onClick={checkBan}>查看封禁用户</button>
                </div>
                {data.page == 0 ? (<></>) : (
                    (data && data.total != 0) ? (
                        <div>{data.rows.map((board) => (state == 0?(<EveryPerson key={board.id} board={board} onBan={banUser}/>):(<EveryBanned key={board.id} board={board} onFree={deBanUser}/>)
                        ))}
                        <Pagination total={data.total} current={pager.page} onChange={handlePageChange} className={style.page} /></div>
                        
                    ) : (
                        <NoMessage/>
                    )
                )}
                
                
                
            </div>

        </div>


    )
}