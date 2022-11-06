import style from './index.module.css';
import NavOfAdmin from '../NavOfAdmin';
import EveryBlock from './../EveryBlock';
import { useEffect, useState } from "react";
import NoMessage from '../NoMessage';
import { message, Pagination, Modal} from 'antd';
import { http } from '../../../utils/http';
import { Input } from 'antd';
import Upload from './../Upload';

const { TextArea } = Input;

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
        setBoardName('');
        setBoardDes('');
        setUri("file.jpg");
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
        async function submitBoard() {
            let res = await http.post(`/board`, {
                name: boardName,
                img: avatarUri,
                description: boardDes
            });
            if (res.code == 0) {
                message.success("添加版块成功！");
                fetchList(pager);
            } else {
                message.error(res.msg);
            }
        }
        submitBoard();
        
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    async function deleteUser(id){
        let res = await http.delete(`/board/${id}`);
        if(res.code != 0){
            message.error(res.msg);
        }else{
            message.success("删除版块成功！");
            fetchList(pager);
        }
    }
    return (
        <div className={style.root}>
            <NavOfAdmin />
            <div className={style.contentBox}>
                <div className={style.title}>管理板块</div>
                <div className={style.btnBox}>
                    <button className={style.btn1} onClick={manageNow}>刷新当前版块</button>
                    <button className={style.btn1} onClick={showModal}>添加版块</button>
                </div>
                <Modal title="请填写文章信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} cancelText='关闭' okText='确认'>
                    <p className={style.text2}>版块名称</p>
                    <Input placeholder='请输入版块名称（不多于10个字符）' value={boardName} onChange={onchangeName} maxLength={10}/>
                    <p className={style.text2}>设置图片</p>
                    <div className={style.imgBox}>
                        <Upload setImageUrl={setUri} imageUrl={"http://bbs.wyy.ink:8080/images/" + avatarUri} />
                    </div>
                    <p className={style.text2}>版块简介</p>
                    <TextArea rows={4} placeholder="请输入不多于50字的简介" maxLength={50} value={boardDes} onChange={onChangeDes} />
                </Modal>
                <div className={style.boardBox}>
                    {(data.page == 0) ? (<></>) : (
                        (data && data.total != 0) ? (
                            <>{data.rows.map((board) => (
                                <EveryBlock key={board.id} board={board} onDelete={deleteUser}/>
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