import { useEffect, useState } from 'react';
import { http } from '../../utils/http';
import url from './../../img/file.jpg'
import './index.css'

export default function UserBlock(props) {

    var [user, setUser] = useState({
        avatarUri: url,
        nickname: "板块",
        fans: 0
    });

    const getUser = async (userId) => {
        if (userId == undefined) userId = null;
        if (userId == null) return;
        let res = await http.get(`/account/${userId}`);
        if (res.code != 0) {
            return;
        }
        let avatarUri = "http://bbs.wyy.ink:8080/images/" + res.data.avatar_uri;
        let nickname = res.data.nickname;
        res = await http.get(`/friend/countFans/${userId}`);
        if (res.code != 0) {
            return;
        }
        setUser({
            avatarUri: avatarUri,
            nickname: nickname,
            fans: res.data
        });
    }

    useEffect(()=>{getUser(props.userId)}, [])

    const handleClick = () => {
        window.location.href = `/user/${props.userId}`;
    }

    return (
        <div className='relatedMember' onClick={handleClick}>
            <img src={user.avatarUri} className="memberImg"></img>
            <span className='contentBox'>
                <div className='text1'>{user.nickname}</div>
                <div className='text2'>粉丝：{user.fans}</div>
            </span>
        </div>
    )
}