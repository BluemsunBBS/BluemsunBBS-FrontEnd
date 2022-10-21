import style from './index.module.css'
import Markdown from '../Markdown';
import imgurl from './../../img/1.jpg'
import {
    HeartOutlined,
    MessageOutlined
} from '@ant-design/icons';
import React from 'react';

function Article(){
    var url = imgurl;
    return(
        <div className={style.articleBox}>
            <span className={style.iconBox}>
                <div className={style.icon}>
                    <HeartOutlined/>
                </div>
                <div className={style.icon}>
                    <MessageOutlined/>
                </div>
            </span>
            <span className={style.article}>
                <div className={style.articleTitle}>我是文章的标题</div>
                <Markdown/>
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
    )
}
export default Article;