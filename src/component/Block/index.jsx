import './index.css'
import url from './../../img/1.jpg'
import UserBlock from '../UserBlock';
import ArticleBlock from '../ArticleBlock';
import BoardBlock from '../BoardBlock';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { http } from '../../utils/http';
import { Pagination } from 'antd';

function Block(){
    var imgurl = url;

    var searchParam = useParams();
    const [pager, setPager] = useState({
        page: 1,
        size: 20
    });
    const [data, setData] = useState({
        page: 0,
        size: 0,
        rows: [],
        total: 0
    })

    async function fetch(searchParam, pager) {
        let res = await http.get(`/article/list`, {
            params: {
                page: pager.page,
                size: pager.size,
                order: "update_time desc",
                title: searchParam.searchStr
            }
        })
        if (res.code != 0) {
            return null;
        }
        return res.data;
    }

    useEffect(() => {
        async function render() {
            var data = await fetch(searchParam, pager);
            setData(data);
        }
        render();
    }, [pager])

    const handlePageChange = (page, pageSize) => {
        setPager({
            page: page,
            size: pageSize
        });
    }

    const ArticleBlocks = () => {
        if (data) {
            return (
                <>
                    <div className='relatedTitle'>相关文章</div>
                    {data.rows.map((article) => (
                        <ArticleBlock articleId={article.id} />
                    ))}
                    <Pagination onChange={handlePageChange} total={data.total} />
                </>
            );
        } else {
            return (
                <div>没有匹配的内容</div>
            )
        }
    }

    return(
        <div className='listBox'>
            <div className='title'>为您找到的搜索结果如下</div>
            <div className='relatedMemberBox'>
                <div className='relatedTitle'>相关用户</div>
                <UserBlock userId="ac07ae08db814c9c94267f2fd11ece6e" />
            </div>
            <div className='relatedBlockBox'>
                <div className='relatedTitle'>相关板块</div>
                <BoardBlock boardId="c29aa968327c473780183347cbee0cf0" />
            </div>
            <div className='relatedArticleBox'>
                {/* <div className='relatedTitle'>相关文章</div>
                <ArticleBlock/>
                <ArticleBlock/>
                <Pagination onChange={handlePageChange} total={pager.total} /> */}
                <ArticleBlocks />
            </div>
        </div>
    )
}
export default Block;