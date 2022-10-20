import { useEffect, useState } from 'react';
import { http } from '../../utils/http';
import url from './../../img/file.jpg'
import './index.css'

export default function UserBlock(props) {

    var [board, setBoard] = useState({
        imgUri: url,
        name: "板块",
        follows: 0
    });

    const getUser = async (boardId) => {
        if (boardId == undefined) boardId = null;
        if (boardId == null) return;
        let res = await http.get(`/board/${boardId}`);
        if (res.code != 0) {
            return;
        }
        let imgUri = "http://bbs.wyy.ink:8080/images/" + res.data.img;
        let name = res.data.name;
        res = await http.get(`/friend/countFans/${boardId}`);
        if (res.code != 0) {
            return;
        }
        setBoard({
            imgUri: imgUri,
            name: name,
            follows: res.code
        });
    }

    useEffect(()=>{getUser(props.boardId)}, [])

    const handleClick = () => {
        window.location.href = `/user/${props.boardId}`;
    }

    return (
        <div className='relatedMember' onClick={handleClick}>
            <img src={board.avatarUri} className="memberImg"></img>
            <span className='contentBox'>
                <div className='text1'>{board.nickname}</div>
                <div className='text2'>关注：{board.fans}</div>
            </span>
        </div>
    )
}