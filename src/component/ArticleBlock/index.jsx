import './index.css'
import url from './../../img/1.jpg'

function ArticleBlock(){
    var imgurl = url;
    return(
        <div className='relatedArticle'>
            <div className='text1'>上大学哪有不疯的？不过是硬撑罢了!</div>
            <div className='text2'>作者：吴越洋 创作时间：2022/10/22 21:13</div>
        </div>
    )
}
export default ArticleBlock;