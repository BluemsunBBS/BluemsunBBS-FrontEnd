import Nav from '../../component/Nav/Nav'
import Search from './../../component/Search';
import Carousel from '../../component/Carou';
import './index.css'

function HomePage() {

  return (
    <div>
      {/* 导航栏 */}
      <Nav/>
      {/* 搜索框 */}
      <Search/>
      {/* 轮播图 */}
      <Carousel/>
      {/* 中间的介绍部分 */}
      <div className='centerBox'>
        <div className='leftBox'>
          <div className='myTitle'>我在贴吧</div>
        </div>
        <div className='rightBox'>

        </div>
      </div>
    </div>
  )
}

export default HomePage;