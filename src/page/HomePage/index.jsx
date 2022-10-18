import Nav from '../../component/Nav/Nav'
import Search from './../../component/Search';
import Carousel from '../../component/Carou';

function HomePage() {

  return (
    <div>
      <Nav/>
      <Search/>
      <Carousel/>
      <div className='leftBox'>

      </div>
    </div>
  )
}

export default HomePage;