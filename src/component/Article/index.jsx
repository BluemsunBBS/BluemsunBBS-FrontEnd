import style from './index.module.css'
import Markdown from '../Markdown';

function Article(){
    return(
        <div className={style.articleBox}>
            <span className={style.iconBox}></span>
            <span className={style.article}>
                <div className={style.articleTitle}>我是文章的标题</div>
                <Markdown/>
            </span>
            <span className={style.author}></span>
        </div>
    )
}
export default Article;