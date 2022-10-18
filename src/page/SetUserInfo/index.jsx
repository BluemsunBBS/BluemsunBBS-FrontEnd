import Nav from "../../component/Nav/Nav";
import Search from "../../component/Search";
import { getUserInfo } from "../../utils/func";

function setUserInfo(){
    return(
        <div>
            <Nav nickname={getUserInfo("nickname")}/>
            <Search/>
        </div>
        
    )
}
export default setUserInfo;