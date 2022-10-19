import Nav from '../../component/Nav/Nav'
import Log from '../../component/Log'
import {getUserInfo} from './../../utils/func.js'
import './../../utils/func.js'

function LoginPage() {
  var nickname = getUserInfo("nickname");
  console.log(nickname);
  return (
    <div>
      <Nav nickname={nickname}/>
      <br/><br/>
      <Log/>
    </div>
  )
}

export default LoginPage;