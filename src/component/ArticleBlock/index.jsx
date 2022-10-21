import style from './index.module.css'
import url from './../../img/1.jpg'
import ArticleIcon from './../ArticleIcon'
import { http } from '../../utils/http';
import { message, Skeleton, Space } from 'antd';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { getTimeDiff } from '../../utils/func';
import { Link } from 'react-router-dom';
import { EyeOutlined, HeartOutlined, MessageOutlined } from '@ant-design/icons';

function ArticleBlock(props){
    var imgurl = url;

    var [article, setArticle] = useState({
        title: "题目(占位)",
        author: "作者",
        update_time: "最后一次更新时间",
        summary: "摘要",
        like: 0,
        reply: 0,
        visits: 0,
        top: 0
    });

    var [loading, setLoading] = useState(true);

    const showLoading = () => {
        if (article.update_time == "最后一次更新时间") {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } else {
            setLoading(false);
        }
    }

    const getArticle = () => {
        if (props.article) {
            let article = props.article;
            let timeDiff = getTimeDiff(article.update_time);
            if (timeDiff) timeDiff += "前";
            else timeDiff = "很久以前";
            setArticle({
                title: article.title,
                author: (article.nickname ? article.nickname : "匿名用户"),
                update_time: timeDiff,
                like: article.like,
                reply: article.reply,
                visits: article.visits,
                summary: article.text.substr(0, 200) + 
                (article.text.length > 200 ? "..." : ""),
                top: article.top
            })
        } else {
            return;
        }
    }

    useEffect(()=>{
        showLoading();
        getArticle();
    }, [props.article])

    const navigate = useNavigate();

    const handleClick = () => {
        let articleId;
        if (props.article) {
            articleId = props.article.id;
        } else {
            return;
        }
        navigate(`/article/${articleId}`);
    }

    return(
        <div className={style.relatedArticle}>
            <Skeleton loading={loading} active={true} round={true}>
                <div className={style.text2}>
                    <Link to={`/user/${props.article.user_id}`}>
                        {article.author}
                    </Link> | <span onClick={handleClick}>
                        {article.update_time}
                    </span>
                </div>
                <div className={style.text1} onClick={handleClick}>{article.title}</div>
                <p className={style.text3} onClick={handleClick}>{article.summary}</p>
                <Space className={style.text3}>
                    <EyeOutlined className={style.visit} />{article.visits}
                    <Space className={style.like}>
                        <HeartOutlined />
                        {article.like == 0 ? "点赞" : article.like}
                    </Space>
                    <MessageOutlined className={style.reply} />{article.reply}
                </Space>
            </Skeleton>
        </div>
    )
}
export default ArticleBlock;