import style from './index.module.css'
import url from './../../img/1.jpg'
import UserBlock from '../UserBlock';
import ArticleBlock from '../ArticleBlock';
import BoardBlock from '../BoardBlock';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { http } from '../../utils/http';
import { message, Pagination } from 'antd';
import { ArticleResult } from '../ArticleResult';

function SearchResult(){
    var imgurl = url;

    var searchParam = useParams();

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

    const [articleData, setArticleData] = useState(APIResult);
    const [userData, setUserData] = useState(APIResult);
    const [boardData, setBoardData] = useState(APIResult);

    async function fetchArticle(searchParam, pager) {
        let res = await http.get(`/article/list`, {
            params: {
                page: pager.page,
                size: pager.size,
                order: "update_time desc",
                title: searchParam.searchStr
            }
        });
        if (res.code != 0) {
            message.error(res.msg);
            setArticleData(null);
        } else {
            setArticleData(res.data);
        }
    }

    async function fetchUser(searchParam) {
        let res = await http.get(`/account/search`, {
            params: {
                page: 1,
                size: 9,
                key: searchParam.searchStr
            }
        });
        if (res.code != 0) {
            message.error(res.msg);
            setUserData(null);
        } else {
            setUserData(res.data);
        }
    }

    async function fetchBoard(searchParam) {
        let res = await http.get(`/board/`,{
            params: {
                page: 1,
                size: 9,
                name: searchParam.searchStr
            }
        });
        if (res.code != 0) {
            message.error(res.msg);
            setBoardData(null);
        } else {
            setBoardData(res.data);
        }
    }

    useEffect(() => {
        fetchUser(searchParam);
        fetchBoard(searchParam);
    }, [searchParam])

    useEffect(() => {
        fetchArticle(searchParam, pager);
        console.log("页面切换");
    }, [pager, searchParam])

    const handlePageChange = (page, pageSize) => {
        setPager({
            page: page,
            size: pageSize
        });
    }

    // const UserBlocks = () => {
    //     if (userData && userData.total != 0) {
    //         return (
    //             <>
    //                 {userData.rows.map((user) => (
    //                     <UserBlock key={user.id} user={user} />
    //                 ))}
    //             </>
    //         );
    //     } else {
    //         return (
    //             <div>找不到匹配的用户</div>
    //         )
    //     }
    // }

    // const ArticleBlocks = () => {
    //     if (articleData && articleData.total != 0) {
    //         return (
    //             <>
    //                 {articleData.rows.map((article) => (
    //                     <ArticleBlock key={article.id} articleId={article.id} />
    //                 ))}
    //                 <Pagination onChange={handlePageChange} total={articleData.total} />
    //             </>
    //         );
    //     } else {
    //         return (
    //             <div>找不到匹配的帖子</div>
    //         )
    //     }
    // }

    return(
        <div className={style.listBox}>
            <div className={style.title}>为您找到的搜索结果如下</div>
            {(userData && userData.total != 0) ? (
                <div className={style.relatedMemberBox}>
                    <div className={style.relatedTitle}>相关用户</div>
                    {userData.rows.map((user) => (
                        <UserBlock key={user.id} user={user} />
                    ))}
                </div>
            ):(<></>)}
            {(boardData && boardData.total != 0) ? (
                <div className={style.relatedBlockBox}>
                    <div className={style.relatedTitle}>相关板块</div>
                    {boardData.rows.map((board) => (
                        <BoardBlock key={board.id} board={board} />
                    ))}
                </div>
            ):(<></>)}
            <div className={style.relatedArticleBox}>
                <div className={style.relatedTitle}>相关文章</div>
                <ArticleResult 
                    articleData={articleData} 
                    handlePageChange={handlePageChange}
                    pager={true}
                />
            </div>
        </div>
    )
}
export default SearchResult;