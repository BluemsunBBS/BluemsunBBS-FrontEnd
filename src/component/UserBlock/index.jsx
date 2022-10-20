import { http } from '../../utils/http';
import url from './../../img/file.jpg'
import './index.css'

export default function UserBlock(props) {

    var userId = props.userId;

    var user = {
        avatarUri: url,
        nickname: "用户",
        fans: 0
    }

    const getUser = async (userId) => {
        if (userId == undefined) userId = null;
        if (userId == null) return;
        let res = await http.get(`/account/${userId}`);
        if (res.status != 200 || res.code != 0) {
            return;
        }
        user.avatarUri = "http://bbs.wyy.ink:8080/images/" + res.data.avatar_uri;
        user.nickname = res.data.nickname;
        res = await http.get(`/friend/countFans/${userId}`);
        if (res.status != 200 || res.code != 0) {
            return;
        }
        user.fans = res.data;
    }

    getUser(userId);

    return (
        <div className='relatedMember'>
            <img src={user.avatarUri} className="memberImg"></img>
            <span className='contentBox'>
                <div className='text1'>{user.nickname}</div>
                <div className='text2'>粉丝：{user.fans}</div>
            </span>
        </div>
    )
}