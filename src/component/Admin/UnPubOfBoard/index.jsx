import style from './index.module.css'
import url from './../../../img/1.jpg';
import { http } from '../../../utils/http';
import { message, Skeleton, Space } from 'antd';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { getTimeDiff } from '../../../utils/func';
import { Link } from 'react-router-dom';
import { EyeOutlined, HeartFilled, HeartOutlined, MessageOutlined } from '@ant-design/icons';

function UnPubOfBoard(props) {

    var [article, setArticle] = useState({
        id: "",
        title: "题目(占位)",
        author: "作者",
        board_name: '',
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
                board_name: article.board_name,
                update_time: article.update_time,
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

    useEffect(() => {
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
            } catch (e) {
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

    return (
        <div className={style.relatedArticle}>
            <Skeleton loading={loading} active={true} round={true}>
                <div className={style.text1} onClick={handleClick}>{article.title}</div>
                <div className={style.text2}>
                    <span className={style.text3}>{article.author}</span>
                    <div className={style.text4Box}>
                        <span className={style.text4}>{article.board_name}</span>
                    </div>
                    <span onClick={handleClick} className={style.text5}>
                        {article.update_time}
                    </span>
                    <button className={style.btn1}>删除文章</button>
                    <button className={style.btn1}>审核通过</button>
                </div>


            </Skeleton>
        </div>
    )
}
export default UnPubOfBoard;