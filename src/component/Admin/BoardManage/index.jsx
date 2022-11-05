import style from './index.module.css';
import NavOfAdmin from '../NavOfAdmin';
import EveryBlock from './../EveryBlock';
import { useEffect, useState } from "react";
import NoMessage from '../NoMessage';
import { message, Pagination, Modal } from 'antd';
import { http } from '../../../utils/http';

export default function BoardManage() {
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
        let res = await http.get(`/board/`, {
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
    const manageNow = () => {
        fetchList(pager);
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className={style.root}>
            <NavOfAdmin />
            <div className={style.contentBox}>
                <div className={style.title}>管理板块</div>
                <div className={style.btnBox}>
                    <button className={style.btn1} onClick={manageNow}>管理当前板块</button>
                    <button className={style.btn1} onClick={showModal}>添加板块</button>
                </div>
                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
                <div className={style.boardBox}>
                    {(data.page == 0) ? (<></>) : (
                        (data && data.total != 0) ? (
                            <>{data.rows.map((board) => (
                                <EveryBlock key={board.id} board={board} onClick={() => changeClick(board.id)} />
                            ))}
                                <Pagination total={data.total} current={pager.page} onChange={handlePageChange} className={style.page} /></>

                        ) : (
                            <NoMessage />
                        )
                    )}
                </div>
            </div>

        </div>

    )
}