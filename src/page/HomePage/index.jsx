import Nav from '../../component/Nav/Nav'
import Search from './../../component/Search';
import Carousel from '../../component/Carou';
import './index.css'
import pic from './../../img/1.jpg'
import { getUserInfo } from './../../utils/func.js'
import './../../utils/func.js'
import { ArticleResult } from '../../component/ArticleResult';
import { useEffect, useState} from 'react';
import { http } from '../../utils/http';
import { useNavigate } from 'react-router';



function HomePage() {
  const Navigate = useNavigate();
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

  const [boardData, setBoardData] = useState(APIResult);
  async function fetchBoard(pager) {
    let res = await http.get(`/board/`, {
      params: {
        page: pager.page,
        size: 9
      }
    });
    if (res.code != 0) {
      message.error(res.msg);
      setBoardData(null);
    } else {
      setBoardData(res.data);
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

  const [followFriendData, setFollowFriendData] = useState(APIResult);
  async function fetchFollowFriendData(logUserId, pager) {
    let res = await http.get(`/friend/friendList/${logUserId}`, {
      params: {
        userId: logUserId,
        page: pager.page,
        size: pager.size
      }
    });
    if (res.code != 0) {
      message.error(res.msg);
      setFollowFriendData(null);
    } else {
      setFollowFriendData(res.data);
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
    fetchFollowFriendData(logUserId, pager);
  }, [logUserId, pager]);

  useEffect(() => {
    fetchBoard(pager);
  }, [pager]);

  const handleLink = (id)=>{
    Navigate(`/board/${id}`);
  }

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
          <div className='myTitle'>我在TechVerse</div>
          <img src={userimg} className="myPic"></img>
          <div className='my1'>我关注的版块</div>
          {followBoardData.page == 0 ? (<></>) : (
            (followBoardData && followBoardData.total != 0) ? (
              followBoardData.rows.map((board) => (
                <div className='ba' key={board.id} board={board}>{board.name}</div>
              ))
            ) : (
              <div className='nofollow'>暂无关注</div>
            )
          )}
          <div className='my2'>我关注的作者</div>
          {followFriendData.page == 0 ? (<></>) : (
            (followFriendData && followFriendData.total != 0) ? (
              followFriendData.rows.map((board) => (
                <div className='ba' key={board.id} board={board}>{board.nickname}</div>
              ))
            ) : (
              <></>
            )
          )}
          {followPersonData.page == 0 ? (<></>) : (
            (followPersonData && followPersonData.total != 0) ? (
              followPersonData.rows.map((board) => (
                <div className='ba' key={board.id} board={board}>{board.nickname}</div>
              ))
            ) : (
              <></>
            )
          )}
          {(followFriendData.total == 0 && followPersonData.total == 0)?(<div className='nofollow'>暂无关注</div>):(<></>)}
        </div>
        {/* 右侧部分 */}
        <div className='rightBox'>
          {/* 上半部分 */}
          <div className='hotBox'>
            <div className='hotTitle'>热门版块</div>
            <div className='hot-region'>
              {boardData.page == 0 ? (<></>) : (
                (boardData && boardData.total != 0) ? (
                  boardData.rows.map((board) => (
                    // <div className='ba' key={board.id} board={board}>{board.name}</div>
                    <div className='hotBlockBox' key={board.id} board={board}>
                      <img src={'http://bbs.wyy.ink:8080/images/' + board.img} className="hotPic" onClick={()=>{handleLink(board.id)}}></img>
                      <span className='hot-text-box'>
                        <div className='hot-text1'>{board.name}</div>
                        <div className='hot-text'>{board.article_num}篇文章</div>
                      </span>
                    </div>
                  ))
                ) : (
                  <></>
                )
              )}

            </div>

          </div>
          {/* 下半部分 */}
          <div className='hot-article'>
            <div className='hotTitle'>热门文章</div>
            <ArticleResult
              articleData={articleData}
              pager={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;