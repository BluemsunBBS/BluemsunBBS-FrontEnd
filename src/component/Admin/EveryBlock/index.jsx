import style from './index.module.css';
import { Drawer, message, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { http } from '../../../utils/http';
import EveryHost from '../EveryHost';

export default function EveryBlock(props) {
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
    const handlePageChange = (cur, size) => {
        setPager({
            page: cur,
            size: size
        });
    }


    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        localStorage.setItem("selectedId", board.id);
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const board = props.board;
    var uri = "http://bbs.wyy.ink:8080/images/" + board.img;
    const handleClick = () => {
        window.open(`/board/${board.id}`);
    }

    async function handleHost(id) {
        let boardid = localStorage.getItem("selectedId");
        let res = await http.put(`/board/host`, {
            user_id: id,
            board_id: boardid
        });
        if (res.code != 0) {
            message.error(res.msg);
        } else {
            message.success("添加主持人成功！");
            fetchList(pager);
        }
    }
    return (
        <div className={style.msgBox}>
            <img className={style.boardImg} src={uri} onClick={handleClick}></img>
            <div className={style.text1}>{board.name}</div>
            <span className={style.des}>{board.description}</span>
            <button className={style.btn1} onClick={() => props.onDelete(board.id)}>删除版块</button>
            <button className={style.btn1} onClick={showDrawer}>管理版主</button>
            <Drawer title="管理当前版块版主" placement="right" onClose={onClose} open={open} size={'large'}>
                {data.page == 0 ? (<></>) : (
                    (data && data.total != 0) ? (
                        <div>{data.rows.map((board) => (<EveryHost key={board.id} board={board} onHost={handleHost} />))}
                            <Pagination total={data.total} current={pager.page} onChange={handlePageChange} className={style.page} /></div>

                    ) : (
                        <></>
                    )
                )}
            </Drawer>
        </div>
    )
}