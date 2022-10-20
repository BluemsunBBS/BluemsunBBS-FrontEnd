import { useEffect, useState } from 'react';
import { http } from '../../utils/http';
import url from './../../img/file.jpg'
import style from './index.module.css'

export default function BoardBlock(props) {

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
        res = await http.get(`/follow/list/${boardId}?page=1&size=0`);
        if (res.code != 0) {
            return;
        }
        setBoard({
            imgUri: imgUri,
            name: name,
            follows: res.data.total
        });
    }

    useEffect(()=>{getUser(props.boardId)}, [])

    const handleClick = () => {
        window.location.href = `/board/${props.boardId}`;
    }

    return (
        <div className={style.relatedMember} onClick={handleClick}>
            <img src={board.imgUri} className={style.memberImg}></img>
            <span className={style.contentBox}>
                <div className={style.text1}>{board.name}</div>
                <div className={style.text2}>关注：{board.follows}</div>
            </span>
        </div>
    )
}