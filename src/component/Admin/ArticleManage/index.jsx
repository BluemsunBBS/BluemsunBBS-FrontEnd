import style from './index.module.css';
import NavOfAdmin from '../NavOfAdmin';
import { Menu } from 'antd';
import { useEffect, useState } from "react";
import EveryBlock from './../EveryBlock';
import NoMessage from './../NoMessage';
import { message, notification } from 'antd';
import { http } from '../../../utils/http';
import { useNavigate } from 'react-router';
import { ReloadOutlined } from '@ant-design/icons';
import ArticleList from '../ArticleList';
import UnpublishedArticle from './../UnpublishedArticle';

const items = [
    {
        label: '未审核文章',
        key: 'unchecked'
    },
    {
        label: '已审核文章',
        key: 'checked'
    }
]
export default function ArticleManage() {
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


    const [current, setCurrent] = useState('unchecked');
    const handleClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    const changeLink = () => {
        setLink('0');
    }
    function NotificationContent() {
        switch (current) {
            case "unchecked":
                return "hijcklsjcklsamcklmsaclkmsklvjdvjmdlksvnwel";
            case "checked":
                return "ewjfmkwelnfmklwefnehiwfhnelwnfklwenvgewiovnklde";
        }
    }
    const [link, setLink] = useState('0');
    const [id,setId] = useState('');
    const changeClick = (id) => {
        setLink(id);
        localStorage.setItem("selectedId",id);
        setId(id);
        console.log(id);
    }
    var boardid;
    const toPublished = () => {
        boardid = localStorage.getItem("selectedId");
        setLink(boardid);
    }
    const toUnpublished = () => {
        setLink('1');
    }
    return (
        <div className={style.root}>
            <NavOfAdmin />
            <div className={style.contentBox}>
                <div className={style.title}>管理文章</div>
                <div className={style.text1}>请选择文章所属板块</div>
                <div className={style.boardBox}>
                    {(link == '0') ? ((data.page == 0) ? (<></>) : (
                        (data && data.total != 0) ? (
                            data.rows.map((board) => (
                                <EveryBlock key={board.id} board={board} onClick={() => changeClick(board.id)} />
                            ))
                        ) : (
                            <NoMessage />
                        )
                    )) : (<div>
                        <button className={style.btn1} onClick={changeLink}>返回板块列表 &nbsp;<ReloadOutlined/></button>
                        <button className={style.btn1} onClick={toPublished}>查看已发布文章</button>
                        <button className={style.btn1} onClick={toUnpublished}>查看待审核文章</button>
                        {(link == '1')?(<UnpublishedArticle link={id}/>):(<ArticleList link={link}/>)}
                        
                    </div>
                    )}
                </div>
                {/* <Menu
                    className={style.menu}
                    mode="horizontal"
                    onClick={handleClick}
                    selectedKeys={[current]}
                    items={items}
                />
                <div className={style.notificationContent}>
                    <NotificationContent />
                </div> */}
            </div>

        </div>

    )
}