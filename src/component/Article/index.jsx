import style from './index.module.css'
import Markdown from '../Markdown';
import imgurl from './../../img/1.jpg'
import { http } from '../../utils/http'
import {
    HeartOutlined,
    MessageOutlined,
    HeartFilled,
    MessageFilled
} from '@ant-design/icons';
import { Badge, message } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

function Article() {
    var url = imgurl;

    const params = useParams();

    const navigate = useNavigate();

    async function fetchArticle(articleId) {
        let res = await http.get(`/article/${articleId}`);
        if (res.code != 0) {
            message.error(res.msg);
            setTimeout(() => {
                navigate(-1);
            }, 500);
            return;
        }
        
    }

    useEffect(() => {

    }, [params])

    return (
        <div className={style.centerBox}>
            <div className={style.articleBox}>
                <span className={style.iconBox}>
                    <div className={style.icon}>
                        <Badge count={50} overflowCount={999} offset={[10, 0]}>
                            <HeartOutlined className={style.like} />
                        </Badge>

                    </div>
                    <div className={style.icon}>
                        <Badge count={100} overflowCount={99} offset={[10, 0]}>
                            <MessageOutlined className={style.like} />
                        </Badge>
                    </div>
                </span>
                <span className={style.article}>
                    <div className={style.articleTitle}>我是文章的标题</div>
                    <div className={style.authorBox1}>
                        <img src={url} className={style.authorImg1}></img>
                        <span className={style.authorInfo1}>
                            <div className={style.text3}>孟玮炜</div>
                            <div className={style.text4}>2022年10月21日</div>
                        </span>
                    </div>
                    <Markdown />
                </span>
                <span className={style.authorBox}>
                    <div className={style.author}>
                        <img src={url} className={style.authorImg}></img>
                        <span className={style.authorInfo}>
                            <div className={style.text1}>孟玮炜</div>
                            <div className={style.text2}>粉丝量：0</div>
                        </span>
                        <button className={style.likeBtn}>关 注</button>
                    </div>
                </span>
            </div>
        </div>

    )
}
export default Article;