import './index.css'
import url from './../../img/1.jpg'
import UserBlock from '../UserBlock';
import ArticleBlock from '../ArticleBlock';
import BoardBlock from '../BoardBlock';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { http } from '../../utils/http';

function Block(props){
    var imgurl = url;

    var searchParam = useParams("searchStr");

    useEffect(() => {
        async function fetch(searchParam) {
            // let res = await http.get
        }
    })

    return(
        <div className='listBox'>
            <div className='title'>为您找到的搜索结果如下</div>
            <div className='relatedMemberBox'>
                <div className='relatedTitle'>相关用户</div>
                <UserBlock userId="ac07ae08db814c9c94267f2fd11ece6e" />
                {/* <div className='relatedMember'>
                    <img src={url} className="memberImg"></img>
                    <span className='contentBox'>
                        <div className='text1'>昵称</div>
                        <div className='text2'>粉丝：</div>
                    </span>
                </div>
                <div className='relatedMember'>
                    <img src={url} className="memberImg"></img>
                    <span className='contentBox'>
                        <div className='text1'>昵称</div>
                        <div className='text2'>粉丝：</div>
                    </span>
                </div>
                <div className='relatedMember'>
                    <img src={url} className="memberImg"></img>
                    <span className='contentBox'>
                        <div className='text1'>昵称</div>
                        <div className='text2'>粉丝：</div>
                    </span>
                </div>
                <div className='relatedMember'>
                    <img src={url} className="memberImg"></img>
                    <span className='contentBox'>
                        <div className='text1'>昵称</div>
                        <div className='text2'>粉丝：</div>
                    </span>
                </div> */}
            </div>
            <div className='relatedBlockBox'>
                <div className='relatedTitle'>相关板块</div>
                <BoardBlock boardId="c29aa968327c473780183347cbee0cf0" />
            </div>
            <div className='relatedArticleBox'>
                <div className='relatedTitle'>相关文章</div>
                <ArticleBlock/>
                <ArticleBlock/>
            </div>
        </div>
    )
}
export default Block;