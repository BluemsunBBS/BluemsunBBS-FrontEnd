import style from './index.module.css'
import Markdown from '../Markdown';

function Article(){
    return(
        <div className={style.articleBox}>
            <span className={style.iconBox}></span>
            <span className={style.article}>
                <Markdown/>
            </span>
            <span className={style.author}></span>
        </div>
    )
}
export default Article;