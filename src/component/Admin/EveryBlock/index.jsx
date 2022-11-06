import style from './index.module.css';
import { Drawer, message, Pagination, Modal, Input } from 'antd';
import { useEffect, useState } from 'react';
import { http } from '../../../utils/http';
import EveryHost from '../EveryHost';
import Upload from './../Upload';

const { TextArea } = Input;

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
    async function deleteHost(id) {
        let boardid = localStorage.getItem("selectedId");
        let res = await http.delete(`/board/host`, {
            data: {
                user_id: id,
                board_id: boardid
            }
        });
        if (res.code != 0) {
            message.error(res.msg);
        } else {
            message.success("撤销主持人成功！");
            fetchList(pager);
        }
    }


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setBoardName(board.name);
        setBoardDes(board.description);
        setUri(board.img);
        setIsModalOpen(true);
    };


    const [boardName, setBoardName] = useState('');
    const [avatarUri, setUri] = useState('');
    const [boardDes, setBoardDes] = useState('');

    const onChangeDes = (e) => {
        setBoardDes(e.target.value);
    };
    const onchangeName = (e) => {
        setBoardName(e.target.value);
    };

    const handleOk = () => {
        async function submitBoard(id) {
            let res = await http.put(`/board/${id}`, {
                name: boardName,
                img: avatarUri,
                description: boardDes
            });
            if (res.code == 0) {
                message.success("更新版块成功！");
            } else {
                message.error(res.msg);
            }
        }
        submitBoard(board.id);
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className={style.msgBox}>
            <img className={style.boardImg} src={uri} onClick={handleClick}></img>
            <div className={style.text1}>{board.name}</div>
            <span className={style.des}>{board.description}</span>
            <button className={style.btn1} onClick={() => props.onDelete(board.id)}>删除</button>
            <button className={style.btn1} onClick={showModal}>编辑</button>
            <Modal title="请填写文章信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} cancelText='关闭' okText='确认'>
                <p className={style.text2}>版块名称</p>
                <Input placeholder='请输入版块名称（不多于10个字符）' value={boardName} onChange={onchangeName} maxLength={10} />
                <p className={style.text2}>设置图片</p>
                <div className={style.imgBox}>
                    <Upload setImageUrl={setUri} imageUrl={"http://bbs.wyy.ink:8080/images/" + avatarUri} />
                </div>
                <p className={style.text2}>版块简介</p>
                <TextArea rows={4} placeholder="请输入不多于50字的简介" maxLength={50} value={boardDes} onChange={onChangeDes} />
            </Modal>
            <button className={style.btn1} onClick={showDrawer}>管理版主</button>
            <Drawer title="管理当前版块版主" placement="right" onClose={onClose} open={open} size={'large'}>
                {data.page == 0 ? (<></>) : (
                    (data && data.total != 0) ? (
                        <div>{data.rows.map((board) => (<EveryHost key={board.id} board={board} onHost={handleHost} deleteHost={deleteHost} />))}
                            <Pagination total={data.total} current={pager.page} onChange={handlePageChange} className={style.page} /></div>

                    ) : (
                        <></>
                    )
                )}
            </Drawer>
        </div>
    )
}