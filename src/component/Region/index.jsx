import './index.module.css';
import style from './index.module.css'
import url from './../../img/1.jpg'
import ArticleBlockOfBoard from './../ArticleBlockOfBoard';
import NoMessage from './../NotificationContent/NoMessage';
import { useEffect, useState } from "react";
import { message, notification } from "antd";
import { http } from './../../utils/http'
import { useNavigate, useParams } from 'react-router';

function Region() {
    const userParams = useParams();
    console.log(userParams);
    // const navigate = useNavigate();
    
    const [boardinfo,setboardinfo] = useState({
        create_time:'',
        description:'',
        img:'',
        name:'',
        update_time:''
    });
    async function fetchBoard(userParams) {
        let res = await http.get(`/board/${userParams.id}`);
        console.log(res);
        if (res.code != 0) {
            message.error(res.msg);
        } else {
            setboardinfo(res.data);
        }
    }
    fetchBoard(userParams);
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
    async function fetchList(userParams,pager) {
        let res = await http.get(`/article/list/${userParams.id}`,{
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

    useEffect(() => {
        fetchList(userParams,pager);
    }, [userParams,pager]);
    
    return (
        <div className={style.root}>
            <div className={style.regionBox}>
                {/* 吧的介绍 */}
                <div className={style.topBox}>
                    <img src={regionImg} className={style.regionImg} />
                    <span className={style.regionTitle}>
                        <span className={style.text1}>{boardinfo.name}</span><span className={style.text2}>创建于{boardinfo.create_time}</span>
                        <div className={style.text3}>{boardinfo.description}</div>
                        <div className={style.text4}>{boardinfo.update_time}更新</div>
                    </span>
                </div>
                {/* 吧内搜索 */}
                {/* <div className='searchBox1'>
                <span className='block'>文章</span>
                <span className='block1'>板块信息</span>
                <span className='block1'>联系管理员</span>
                <input type="text" className='search'></input><span className='btn1'>吧内搜索</span>
            </div> */}
                <div>
                {data.page == 0 ? (<></>) : (
                (data && data.total != 0) ? (
                    data.rows.map((article) => (
                        <ArticleBlockOfBoard key={article.id} article={article} />
                    ))
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