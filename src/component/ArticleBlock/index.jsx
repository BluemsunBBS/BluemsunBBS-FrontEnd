import './index.css'
import url from './../../img/1.jpg'
import ArticleIcon from './../ArticleIcon'
import { http } from '../../utils/http';
import { message } from 'antd';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

function ArticleBlock(props){
    var imgurl = url;

    var [article, setArticle] = useState({
        title: "题目",
        author: "作者",
        update_time: "最后一次更新时间",
        like: 0,
        reply: 0,
        visits: 0,
        top: 0
    });

    const getArticle = async () => {
        if (props.article) {
            let article = props.article;
            setArticle({
                title: article.title,
                author: article.nickname,
                update_time: article.update_time,
                like: article.like,
                reply: article.reply,
                visits: article.visits,
                top: article.top
            })
        } else {
            return;
        }
    }

    useEffect(()=>{getArticle()}, [props.article])

    const navigate = useNavigate();

    const handleClick = () => {
        let articleId;
        if (props.article) {
            articleId = props.article.id;
        } else {
            return;
        }
        navigate(`/board/${articleId}`);
    }

    return(
        <div className='relatedArticle'>
            <div className='text1' onClick={handleClick}>{article.title}</div>
            <div className='text2'>作者：{article.author} 创作时间：{article.update_time}</div>
            <ArticleIcon/>
        </div>
    )
}
export default ArticleBlock;