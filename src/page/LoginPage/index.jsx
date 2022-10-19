import Nav from '../../component/Nav/Nav'
import Log from '../../component/Log'
import {getUserInfo} from './../../utils/func.js'
import './../../utils/func.js'

function LoginPage() {
  if (localStorage.getItem("token") != null) {
    window.location.href = "/";
  }
  return (
    <div>
      <Nav/>
      <br/><br/>
      <Log/>
    </div>
  )
}

export default LoginPage;