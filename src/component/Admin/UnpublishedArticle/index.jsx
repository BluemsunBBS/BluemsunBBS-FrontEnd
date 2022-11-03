import style from './index.module.css';
import NoMessage from '../NoMessage';
import { useEffect, useState } from 'react';
import { message, notification, Pagination } from "antd";
import { useNavigate } from 'react-router';
import { http } from '../../../utils/http';
import UnPubOfBoard from './../UnPubOfBoard';

export default function ArticleList(props) {
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
    async function fetchList(props, pager) {
        let res = await http.get(`/article/approve/list/${props.link}`, {
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
        fetchList(props, pager);
    }, [props, pager]);

    const handlePageChange = (cur, size) => {
        setPager({
            page: cur,
            size: size
        });
    }

    async function deleteArticle(articleId){
        let res = await http.delete(`/article/${articleId}`);
        if (res.code != 0) {
            message.error(res.msg);
        } else {
            message.success("删除成功！");
        }
        fetchList(props,pager);
    }
    async function passDraft(articleId){
        let res = await http.put(`/article/approve/${articleId}`);
        if (res.code != 0) {
            message.error(res.msg);
        } else {
            message.success("审核成功！");
        }
        fetchList(props,pager);
    }
    return (
        <div>
            {data.page == 0 ? (<NoMessage />) : (
                (data && data.total != 0) ? (
                    <>
                        {data.rows.map((article) => (
                            <UnPubOfBoard key={article.id} article={article} onDelete={deleteArticle} onPass={passDraft}/>
                        ))}
                        <Pagination total={data.total} current={pager.page} onChange={handlePageChange} className={style.page} />
                    </>
                ) : (
                    <NoMessage />
                )
            )}
        </div>
    )
}