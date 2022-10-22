import style from './index.module.css'
import url from './../../img/1.jpg'
import { http } from '../../utils/http';
import { message, Skeleton, Space } from 'antd';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { getTimeDiff } from '../../utils/func';
import { Link } from 'react-router-dom';
import { EyeOutlined, HeartFilled, HeartOutlined, MessageOutlined } from '@ant-design/icons';

function ArticleBlock(props){

    var [article, setArticle] = useState({
        id: "",
        title: "题目(占位)",
        author: "作者",
        update_time: "最后一次更新时间",
        summary: "摘要",
        isLike: false,
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
                id: article.id,
                title: article.title,
                author: (article.nickname ? article.nickname : "匿名用户"),
                update_time: timeDiff,
                isLike: article.is_like,
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

    const handleComment = () => {
        let articleId;
        if (props.article) {
            articleId = props.article.id;
        } else {
            return;
        }
        navigate(`/article/${articleId}#comment`);
    }

    const handleLike = (state) => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
        let data = { ...article };
        if (state) {
            data.isLike = true;
            data.like++;
        } else {
            data.isLike = false;
            data.like--;
        }
        async function fetchLike() {
            let res;
            try {
                if (state) res = await http.post(`/like/${data.id}`);
                else res = await http.delete(`/like/${data.id}`);
            } catch(e) {
                message.error(e.code);
            }
            if (res.code != 0) {
                message.error(res.msg);
                if (state) {
                    data.like--;
                    data.isLike = false;
                } else {
                    data.like++;
                    data.isLike = true;
                }
            }
            res = await http.get(`/like/list/${data.id}`, {
                params: {
                    page: 1,
                    size: 0
                }
            })
            if (res.code != 0) {
                message.error(res.msg);
            } else {
                data.like = res.data.total;
            }
            setArticle(data);
        }
        setArticle(data);
        fetchLike();
    }

    return(
        <div className={style.relatedArticle}>
            <Skeleton loading={loading} active={true} round={true}>
                <div className={style.text2}>
                    {(article.top != 0) ? (<span>置顶 | </span>) : ("")}
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
                    {!article.isLike ? (
                        <Space className={style.like} onClick={()=>handleLike(true)}>
                            <HeartOutlined />
                            <span style={{fontSize: '10px'}}>
                                {article.like == 0 ? "点赞" : article.like}
                            </span>
                        </Space>
                    ) : (
                        <Space className={style.haveLike} onClick={()=>handleLike(false)}>
                            <HeartFilled />
                            <span style={{fontSize: '10px'}}>
                                {article.like == 0 ? "点赞" : article.like}
                            </span>
                        </Space>
                    )}
                    <Space className={style.reply} onClick={handleComment}>
                        <MessageOutlined />
                        <span style={{fontSize: '10px'}}>
                            {article.reply == 0 ? "评论" : article.reply}
                        </span>
                    </Space>
                </Space>
            </Skeleton>
        </div>
    )
}
export default ArticleBlock;