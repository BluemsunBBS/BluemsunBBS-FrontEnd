import './index.css'
import url from './../../img/1.jpg'
import UserBlock from '../UserBlock';

function Block(){
    var imgurl = url;
    return(
        <div className='listBox'>
            <div className='title'>为您找到的搜索结果如下</div>
            <div className='relatedMemberBox'>
                <div className='relatedTitle'>相关用户</div>
                <UserBlock userId="ac07ae08db814c9c94267f2fd11ece6e" />
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
                </div>
                <div className='relatedMember'>
                    <img src={url} className="memberImg"></img>
                    <span className='contentBox'>
                        <div className='text1'>昵称</div>
                        <div className='text2'>粉丝：</div>
                    </span>
                </div>
            </div>
            <div className='relatedBlockBox'>
                <div className='relatedTitle'>相关板块</div>
            </div>
            <div className='relatedArticleBox'>
                <div className='relatedTitle'>相关文章</div>
            </div>
        </div>
    )
}
export default Block;