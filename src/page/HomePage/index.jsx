import Nav from '../../component/Nav/Nav'
import './index.css'

function LoginPage() {

  return (
    <div>
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