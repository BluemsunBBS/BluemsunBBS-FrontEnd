import style from './index.module.css'
import ArticleBlock from '../ArticleBlock';
import { Pagination } from 'antd';

export function ArticleResult(props) {

    const articleData = props.articleData;

    const handlePageChange = props.handlePageChange;

    return (
        (articleData && articleData.total != 0) ? (
            <>
                {articleData.rows.map((article) => (
                    <ArticleBlock key={article.id} article={article} />
                ))}
                {(props.pager) ? (
                    <div className={style.pagination}>
                        <Pagination
                            showSizeChanger
                            onChange={handlePageChange}
                            total={articleData.total}
                        />
                    </div>
                ):(<></>)}
            </>
        ):(<></>)
    );
}