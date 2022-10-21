import Nav from "../../component/Nav/Nav";
import Search from "../../component/Search";
import Article from './../../component/Article'
import style from './index.module.css'

function ArticlePage(){
    return(
        <div>
            <Nav/>
            <Search/>
            <Article/>
        </div>
    )
}
export default ArticlePage;