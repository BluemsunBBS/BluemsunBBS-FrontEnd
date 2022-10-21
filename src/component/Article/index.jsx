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
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

function Article() {
    var url = imgurl;

    const params = useParams();

    const navigate = useNavigate();

    const [article, setArticle] = useState({
        title: "我是文章标题",
        text: `# 我是正文`,
    });
    const [user, setUser] = useState({
        nickname: "昵称",
    });
    const [follow, setFollow] = useState(false);
    const [fans, setFans] = useState(0);

    async function fetchArticle(articleId) {
        let res = await http.get(`/article/${articleId}`);
        if (res.code != 0) {
            message.error(res.msg);
            setTimeout(() => {
                navigate(-1);
            }, 500);
            setArticle(null);
            return;
        }
        setArticle(res.data);
        let data = res.data;
        res = await http.get(`/account/${data.user_id}`);
        if (res.code != 0) {
            message.error(res.msg);
            setUser(null);
        } else {
            setUser(res.data);
        }
        res = await http.get(`/friend/check/${data.user_id}`);
        if (res.code == 0) {
            setFollow(true);
        } else {
            setFollow(false);
        }
        res = await http.get(`/friend/countFans/${data.user_id}`);
        if (res.code == 0) {
            setFans(res.data);
        }
    }

    useEffect(() => {
        fetchArticle(params.id);
    }, [params])

    const handleFollow = (state) => {
        async function fetchFollow() {
            let res;
            if (state) res = await http.post(`/friend/${article.user_id}`);
            else res = await http.delete(`/friend/${article.user_id}`);
            if (res.code != 0) {
                message.error(res.msg);
                setFollow(!state);
            } else {
                setFollow(state);
            }
            res = await http.get(`/friend/countFans/${article.user_id}`);
            if (res.code == 0) {
                setFans(res.data);
            }
        }
        fetchFollow();
    }

    const handleLike = (state) => {
        fetchLike();
        var data = { ...article };
        data.is_like = state;
        async function fetchLike() {
            let res;
            if (state) res = await http.post(`/like/${article.id}`);
            else res = await http.delete(`/like/${article.id}`);
            if (res.code != 0) {
                message.error(res.msg);
                data.is_like = !state;
            }
            res = await http.get(`/like/list/${article.id}`);
            if (res.code == 0) {
                data.like = res.data.total;
            }
            setArticle(data);
        }
    }

    return (
        <div className={style.centerBox}>
            <div className={style.articleBox}>
                <span className={style.iconBox}>
                    <div className={style.icon}>
                        <Badge count={article.like} overflowCount={999} offset={[10, 0]}>
                            {!article.is_like ? (
                                <HeartOutlined
                                    className={style.like}
                                    onClick={()=>handleLike(true)}
                                />
                            ) : (
                                <HeartFilled
                                    className={style.like}
                                    onClick={()=>handleLike(false)}
                                />
                            )}
                        </Badge>

                    </div>
                    <div className={style.icon}>
                        <Badge count={article.reply} overflowCount={99} offset={[10, 0]}>
                            <MessageOutlined className={style.like} />
                        </Badge>
                    </div>
                </span>
                <span className={style.article}>
                    <div className={style.articleTitle}>{article.title}</div>
                    <div className={style.authorBox1}>
                        <img
                            src={`http://bbs.wyy.ink:8080/images/${user.avatar_uri}`}
                            className={style.authorImg1}>
                        </img>
                        <span className={style.authorInfo1}>
                            <div className={style.text3}>
                                {user.nickname == null ? user.username : user.nickname}
                            </div>
                            <div className={style.text4}>{article.update_time}</div>
                        </span>
                    </div>
                    <Markdown text={article.text} />
                </span>
                <span className={style.authorBox}>
                    <div className={style.author}>
                        <img
                            src={`http://bbs.wyy.ink:8080/images/${user.avatar_uri}`}
                            className={style.authorImg}>
                        </img>
                        <span className={style.authorInfo}>
                            <div className={style.text1}>{user.nickname}</div>
                            <div className={style.text2}>粉丝：{fans}</div>
                        </span>
                        <button className={style.likeBtn} onClick={()=>handleFollow(!follow)}>
                            {(!follow) ? ("关 注") : ("取消关注")}
                        </button>
                    </div>
                </span>
            </div>
        </div>

    )
}
export default Article;