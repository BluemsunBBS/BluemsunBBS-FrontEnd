import './index.css'
import url from './../../img/1.jpg'

function ArticleBlock(){
    var imgurl = url;
    return(
        <div className='relatedArticle'>
            <img src={url} className='articleImg'></img>
        </div>
    )
}
export default ArticleBlock;