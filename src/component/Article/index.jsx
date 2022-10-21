import style from './index.module.css'

function Article(){
    return(
        <div className={style.articleBox}>
            <span className={style.iconBox}></span>
            <span className={style.article}></span>
            <span className={style.author}></span>
        </div>
    )
}
export default Article;