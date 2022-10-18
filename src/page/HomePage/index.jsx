import Nav from '../../component/Nav/Nav'
import Search from './../../component/Search';
import Carousel from '../../component/Carou';
import './index.css'
import pic from './../../img/1.jpg'
import {getUserInfo} from './../../utils/func.js'
import './../../utils/func.js'

function HomePage() {
  var nickname = getUserInfo("nickname");
  console.log(nickname)
  const url = pic;
  return (
    <div>
      {/* 导航栏 */}
      <Nav nickname={nickname}/>
      {/* 搜索框 */}
      <Search/>
      {/* 轮播图 */}
      <Carousel/>
      {/* 中间的介绍部分 */}
      <div className='centerBox'>
        {/* 左侧部分 */}
        <div className='leftBox'>
          <div className='myTitle'>我在贴吧</div>
          <img src={url} className="myPic"></img>
          <div className='my1'>我关注的贴吧</div>
          <div className='ba'>东北师范大学吧</div>
          <div className='ba'>蓝旭吧</div>
          <div className='ba'>吴越洋吧</div>
          <div className='ba'>赵鑫源吧</div>
          <div className='ba'>李霁鹏吧</div>
          <div className='ba'>冯国忠吧</div>
          <div className='my2'>我关注的作者</div>
          <div className='ba'>吴越洋</div>
          <div className='ba'>赵鑫源</div>
          <div className='ba'>李霁鹏</div>
          <div className='ba'>冯国忠</div>
        </div>
        {/* 右侧部分 */}
        <div className='rightBox'>
          <div className='hot'>
            <div className='hotTitle'>热门贴</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;