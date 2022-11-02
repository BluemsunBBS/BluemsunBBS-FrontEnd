import './index.module.css';
import style from './index.module.css'
import url from './../../img/1.jpg'
import ArticleBlockOfBoard from './../ArticleBlockOfBoard';
import NoMessage from './../NotificationContent/NoMessage';
import { useEffect, useState } from "react";
import { message, notification, Pagination } from "antd";
import { http } from './../../utils/http'
import { useNavigate, useParams } from 'react-router';

function Region() {
    const userParams = useParams();
    console.log(userParams);
    // const navigate = useNavigate();

    const [follow, setFollow] = useState(false);
    const [boardinfo, setboardinfo] = useState({
        create_time: '',
        description: '',
        img: '',
        name: '',
        update_time: ''
    });
    async function fetchBoard(userParams) {
        let res = await http.get(`/board/${userParams.id}`);
        console.log(res);
        if (res.code != 0) {
            message.error(res.msg);
        } else {
            setboardinfo(res.data);
        }
        res = await http.get(`/follow/${userParams.id}`);
        if (res.code == 0) {
            setFollow(true);
        } else {
            setFollow(false);
        }
    }
    useEffect(()=>{fetchBoard(userParams)}, [])
    var regionImg = "http://bbs.wyy.ink:8080/images/" + boardinfo.img;

    const [pager, setPager] = useState({
        page: 1,
        size: 10
    });

    const APIResult = {
        page: 0,
        size: 0,
        rows: [],
        total: 0
    }

    const [data, setData] = useState(APIResult);
    async function fetchList(userParams, pager) {
        let res = await http.get(`/article/list/${userParams.id}`, {
            params: {
                page: pager.page,
                size: pager.size
            }
        });
        console.log(res);
        if (res.code != 0) {
            message.error(res.msg);
            setData(APIResult);
        } else {
            setData(res.data);
        }
    }

    const handleFollow = (state) => {
        async function fetchFollow() {
            let res;
            if (state) res = await http.post(`/follow/${userParams.id}`);
            else res = await http.delete(`/follow/${userParams.id}`);
            if (res.code != 0) {
                message.error(res.msg);
                setFollow(!state);
            } else {
                setFollow(state);
            }
        }
        fetchFollow();
    }

    useEffect(() => {
        fetchList(userParams, pager);
    }, [userParams, pager]);

    const handlePageChange = (cur, size) => {
        setPager({
            page: cur,
            size: size
        });
    }

    return (
        <div className={style.root}>
            <div className={style.regionBox}>
                {/* 吧的介绍 */}
                <div className={style.topBox}>
                    <img src={regionImg} className={style.regionImg} />
                    <span className={style.regionTitle}>
                        <span className={style.text1}>{boardinfo.name}</span><span className={style.text2}>创建于{boardinfo.create_time}</span>
                        <div className={style.text3}>{boardinfo.description}</div>
                        <div className={style.box1}>
                            <div className={style.text4}>{boardinfo.update_time}更新</div>
                            <button className={style.btn1} onClick={()=>handleFollow(!follow)}>
                            {(!follow) ? ("关 注") : ("取消关注")}</button>
                        </div>

                    </span>
                </div>
                <div>
                    {data.page == 0 ? (<NoMessage />) : (
                        (data && data.total != 0) ? (
                            <>
                                {data.rows.map((article) => (
                                    <ArticleBlockOfBoard key={article.id} article={article} />
                                ))}
                                <Pagination total={data.total} current={pager.page} onChange={handlePageChange} />
                            </>
                        ) : (
                            <NoMessage />
                        )
                    )}
                </div>
            </div>
        </div>

    )
}
export default Region;