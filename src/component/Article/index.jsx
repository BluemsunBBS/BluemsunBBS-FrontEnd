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
import CommentResult from '../Comment/CommentResult';
import imgUri from '../../img/file.jpg'

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
        avatar_uri: imgUri
    });
    const [comments, setComments] = useState({
        page: 0,
        size: 0,
        rows: [],
        total: 0
    })
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

    async function fetchComments(articleId) {
        let res = await http.get(`/reply/list/${articleId}`, {
            params: {
                page: 1,
                size: 1000
            }
        });
        if (res.code != 0) {
            message.error(res.msg);
            return;
        }
        setComments(res.data);
    }

    useEffect(() => {
        fetchArticle(params.id);
        fetchComments(params.id);
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

    const handleReply = (comment) => {
        if (comment.delete) {
            async function deleteComment() {
                let res = await http.delete(`/reply/${comment.replyId}`);
                if (res.code != 0) {
                    message.error(res.msg);
                    return;
                }
                if (comment.mode == "article") {
                    var newArticle = { ...article }
                    newArticle.reply--;
                    setArticle(newArticle);
                }
                fetchComments(params.id);
            }
            deleteComment();
            return;
        }
        async function submitComment() {
            let res = await http.post("/reply/", comment);
            if (res.code != 0) {
                message.error(res.msg);
                return;
            }
            if (comment.article_id) {
                var newArticle = { ...article }
                newArticle.reply++;
                setArticle(newArticle);
            }
            fetchComments(params.id);
        }
        submitComment();
    }

    const handleClick = () =>{
        console.log(user);
        let userId;
        if(user){
            userId = user.id;
        }else{
            return;
        }
        navigate(`/user/${userId}`);
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
                            <a href='#comment' >
                                <MessageOutlined className={style.like} />
                            </a>
                        </Badge>
                    </div>
                </span>

                <span className={style.article}>
                    <div className={style.articleTitle}>{article.title}</div>
                    <div className={style.authorBox1}>
                        <img
                            src={`http://bbs.wyy.ink:8080/images/${user.avatar_uri}`}
                            className={style.authorImg1}
                            onClick={handleClick}>
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
                            className={style.authorImg}
                            onClick={handleClick}>
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

                <span className={style.commentBox}>
                    <CommentResult
                        comments={comments}
                        article={article}
                        onSubmit={handleReply}
                    />
                </span>

            </div>
        </div>

    )
}
export default Article;