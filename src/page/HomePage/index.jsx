import Nav from '../../component/Nav/Nav'
import Search from './../../component/Search';
import Carousel from '../../component/Carou';
import './index.css'
import pic from './../../img/1.jpg'
import { getUserInfo } from './../../utils/func.js'
import './../../utils/func.js'

function HomePage() {
  var nickname = getUserInfo("nickname");
  console.log(nickname)
  const url = pic;
  var userimg = getUserInfo("avatar_uri");
  userimg = 'http://bbs.wyy.ink:8080/images/'+userimg;
  return (
    <div>
      {/* 导航栏 */}
      <Nav/>
      {/* 搜索框 */}
      <Search />
      {/* 轮播图 */}
      <Carousel />
      {/* 中间的介绍部分 */}
      <div className='centerBox'>
        {/* 左侧部分 */}
        <div className='leftBox'>
          <div className='myTitle'>我在贴吧</div>
          <img src={userimg} className="myPic"></img>
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
          {/* 上半部分 */}
          
          <div className='hotBox'>
            <div className='hotTitle'>热门贴吧</div>
            <div className='hot-region'>
              <div className='hotBlockBox'>
                <img src={url} className="hotPic"></img>
                <span className='hot-text-box'>
                  <div className='hot-text1'>冯国忠吧</div>
                  <div className='hot-text'>1000篇文章</div>
                </span>
              </div>
              <div className='hotBlockBox'>
                <img src={url} className="hotPic"></img>
                <span className='hot-text-box'>
                  <div className='hot-text1'>冯国忠吧</div>
                  <div className='hot-text'>1000篇文章</div>
                </span>
              </div>
              <div className='hotBlockBox'>
                <img src={url} className="hotPic"></img>
                <span className='hot-text-box'>
                  <div className='hot-text1'>冯国忠吧</div>
                  <div className='hot-text'>1000篇文章</div>
                </span>
              </div>
              <div className='hotBlockBox'>
                <img src={url} className="hotPic"></img>
                <span className='hot-text-box'>
                  <div className='hot-text1'>冯国忠吧</div>
                  <div className='hot-text'>1000篇文章</div>
                </span>
              </div>
              <div className='hotBlockBox'>
                <img src={url} className="hotPic"></img>
                <span className='hot-text-box'>
                  <div className='hot-text1'>冯国忠吧</div>
                  <div className='hot-text'>1000篇文章</div>
                </span>
              </div>
              <div className='hotBlockBox'>
                <img src={url} className="hotPic"></img>
                <span className='hot-text-box'>
                  <div className='hot-text1'>冯国忠吧</div>
                  <div className='hot-text'>1000篇文章</div>
                </span>
              </div>
              <div className='hotBlockBox'>
                <img src={url} className="hotPic"></img>
                <span className='hot-text-box'>
                  <div className='hot-text1'>冯国忠吧</div>
                  <div className='hot-text'>1000篇文章</div>
                </span>
              </div>
              <div className='hotBlockBox'>
                <img src={url} className="hotPic"></img>
                <span className='hot-text-box'>
                  <div className='hot-text1'>冯国忠吧</div>
                  <div className='hot-text'>1000篇文章</div>
                </span>
              </div>
              <div className='hotBlockBox'>
                <img src={url} className="hotPic"></img>
                <span className='hot-text-box'>
                  <div className='hot-text1'>冯国忠吧</div>
                  <div className='hot-text'>1000篇文章</div>
                </span>
              </div>
            </div>
            
          </div>
          {/* 下半部分 */}
          <div className='hot-article'>
            <div className='hotTitle'>热门文章</div>
            <div className='hot-article-block'>
              <img src={url} className='hotPic1'/>
              <span className='hot-text-box1'>
                <div className='hot-text2'>如何做到在冯国忠课上不被提问？</div>
                <div className='hot-text3'>不早了，洗洗睡吧</div>
                <div className='hot-text4'>吴越洋最新发布</div>
              </span>
            </div>
            <div className='hot-article-block'>
              <img src={url} className='hotPic1'/>
              <span className='hot-text-box1'>
                <div className='hot-text2'>如何做到在冯国忠课上不被提问？</div>
                <div className='hot-text3'>不早了，洗洗睡吧</div>
                <div className='hot-text4'>吴越洋最新发布</div>
              </span>
            </div>
            <div className='hot-article-block'>
              <img src={url} className='hotPic1'/>
              <span className='hot-text-box1'>
                <div className='hot-text2'>如何做到在冯国忠课上不被提问？</div>
                <div className='hot-text3'>不早了，洗洗睡吧</div>
                <div className='hot-text4'>吴越洋最新发布</div>
              </span>
            </div>
            <div className='hot-article-block'>
              <img src={url} className='hotPic1'/>
              <span className='hot-text-box1'>
                <div className='hot-text2'>如何做到在冯国忠课上不被提问？</div>
                <div className='hot-text3'>不早了，洗洗睡吧</div>
                <div className='hot-text4'>吴越洋最新发布</div>
              </span>
            </div>
            <div className='hot-article-block'>
              <img src={url} className='hotPic1'/>
              <span className='hot-text-box1'>
                <div className='hot-text2'>如何做到在冯国忠课上不被提问？</div>
                <div className='hot-text3'>不早了，洗洗睡吧</div>
                <div className='hot-text4'>吴越洋最新发布</div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;