import Nav from '../../component/Nav/Nav'
import Search from './../../component/Search';
import Carousel from '../../component/Carou';
import './index.css'
import pic from './../../img/1.jpg'
import { getUserInfo } from './../../utils/func.js'
import './../../utils/func.js'
import { ArticleResult } from '../../component/ArticleResult';
import { useEffect, useState } from 'react';
import { http } from '../../utils/http';

function HomePage() {
  var nickname = getUserInfo("nickname");
  var logUserId = getUserInfo("id");
  const url = pic;
  var userimg = getUserInfo("avatar_uri");
  userimg = 'http://bbs.wyy.ink:8080/images/' + userimg;

  const [pager, setPager] = useState({
    page: 1,
    size: 10,
    userId: logUserId
  });
  const APIResult = {
    page: 0,
    size: 0,
    rows: [],
    total: 0
  }

  const [articleData, setArticleData] = useState(APIResult);
  async function fetchArticle(searchParam, pager) {
    let res = await http.get(`/article/list`, {
      params: {
        page: pager.page,
        size: pager.size,
        order: "visits desc",
        title: searchParam.searchStr
      }
    });
    if (res.code != 0) {
      message.error(res.msg);
      setArticleData(null);
    } else {
      setArticleData(res.data);
    }
  }

  const [followBoardData, setFollowBoardData] = useState(APIResult);
  async function fetchFollowBoardData(logUserId, pager) {
    let res = await http.get(`/follow/listBoard/${logUserId}`, {
      params: {
        userId: logUserId,
        page: pager.page,
        size: pager.size
      }
    });
    if (res.code != 0) {
      message.error(res.msg);
      setFollowBoardData(null);
    } else {
      setFollowBoardData(res.data);
    }
  }

  const [followPersonData, setFollowPersonData] = useState(APIResult);
  async function fetchFollowPersonData(logUserId, pager) {
    let res = await http.get(`/friend/followList/${logUserId}`, {
      params: {
        userId: logUserId,
        page: pager.page,
        size: pager.size
      }
    });
    if (res.code != 0) {
      message.error(res.msg);
      setFollowPersonData(null);
    } else {
      setFollowPersonData(res.data);
    }
  }

  useEffect(() => {
    fetchArticle({ searchStr: "" }, {
      page: 1,
      size: 10
    });
  }, [])

  useEffect(() => {
    fetchFollowBoardData(logUserId, pager);
    fetchFollowPersonData(logUserId, pager);
  }, [logUserId, pager]);

  return (
    <div className='cbox'>
      {/* 导航栏 */}
      <Nav />
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
          {followBoardData.page == 0 ? (<></>) : (
            (followBoardData && followBoardData.total != 0) ? (
              followBoardData.rows.map((board) => (
                <div className='ba' key={board.id} board={board}>{board.name}</div>
              ))
            ) : (
              <></>
            )
          )}
          <div className='my2'>我关注的作者</div>
          {followPersonData.page == 0 ? (<></>) : (
            (followPersonData && followPersonData.total != 0) ? (
              followPersonData.rows.map((board) => (
                <div className='ba' key={board.id} board={board}>{board.nickname}</div>
              ))
            ) : (
              <></>
            )
          )}
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
            <ArticleResult
              articleData={articleData}
              pager={false}
            />
            {/* <div className='hot-article-block'>
              <img src={url} className='hotPic1' />
              <span className='hot-text-box1'>
                <div className='hot-text2'>如何做到在冯国忠课上不被提问？</div>
                <div className='hot-text3'>不早了，洗洗睡吧</div>
                <div className='hot-text4'>吴越洋最新发布</div>
              </span>
            </div>
            <div className='hot-article-block'>
              <img src={url} className='hotPic1' />
              <span className='hot-text-box1'>
                <div className='hot-text2'>如何做到在冯国忠课上不被提问？</div>
                <div className='hot-text3'>不早了，洗洗睡吧</div>
                <div className='hot-text4'>吴越洋最新发布</div>
              </span>
            </div>
            <div className='hot-article-block'>
              <img src={url} className='hotPic1' />
              <span className='hot-text-box1'>
                <div className='hot-text2'>如何做到在冯国忠课上不被提问？</div>
                <div className='hot-text3'>不早了，洗洗睡吧</div>
                <div className='hot-text4'>吴越洋最新发布</div>
              </span>
            </div>
            <div className='hot-article-block'>
              <img src={url} className='hotPic1' />
              <span className='hot-text-box1'>
                <div className='hot-text2'>如何做到在冯国忠课上不被提问？</div>
                <div className='hot-text3'>不早了，洗洗睡吧</div>
                <div className='hot-text4'>吴越洋最新发布</div>
              </span>
            </div>
            <div className='hot-article-block'>
              <img src={url} className='hotPic1' />
              <span className='hot-text-box1'>
                <div className='hot-text2'>如何做到在冯国忠课上不被提问？</div>
                <div className='hot-text3'>不早了，洗洗睡吧</div>
                <div className='hot-text4'>吴越洋最新发布</div>
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;