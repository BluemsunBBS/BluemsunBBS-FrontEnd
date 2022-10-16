import Nav from '../../component/Nav/Nav'
import Log from '../../component/Log/Log'

function LoginPage() {

  return (
    <div className='root'>
      <Nav/>
      <div className="searchContainer">
        <input type="text" className="inputBox"></input>
        <button className="searchBtn">BBS搜索</button>
      </div>
      <br/><br/>
      <Log/>
    </div>
  )
}

export default LoginPage;