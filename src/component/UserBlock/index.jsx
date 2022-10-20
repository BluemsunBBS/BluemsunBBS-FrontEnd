import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { http } from '../../utils/http';
import url from './../../img/file.jpg'
import './index.css'

export default function UserBlock(props) {

    var [user, setUser] = useState({
        avatarUri: url,
        nickname: "用户",
        fans: 0
    });

    const getUser = async () => {
        let avatarUri, nickname;
        let userId, res;
        if (props.user) {
            const user = props.user;
            userId = user.id;
            avatarUri = "http://bbs.wyy.ink:8080/images/" + user.avatar_uri;
            nickname = user.nickname;
        } else {
            userId = props.userId;
            if (userId == undefined) userId = null;
            if (userId == null) return;
            res = await http.get(`/account/${userId}`);
            if (res.code != 0) {
                return;
            }
            avatarUri = "http://bbs.wyy.ink:8080/images/" + res.data.avatar_uri;
            nickname = res.data.nickname;
        }
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

    useEffect(() => {
        getUser();
    }, []);

    let navigate = useNavigate();

    const handleClick = () => {
        let userId;
        if (props.user) {
            userId = props.user.id;
        } else {
            userId = props.userId;
        }
        navigate(`/user/${userId}`);
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