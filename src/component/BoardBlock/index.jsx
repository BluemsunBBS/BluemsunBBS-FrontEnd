import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { http } from '../../utils/http';
import url from './../../img/file.jpg'
import style from './index.module.css'

export default function BoardBlock(props) {

    var [board, setBoard] = useState({
        imgUri: url,
        name: "板块",
        follows: 0
    });

    const getBoard = async () => {
        let boardId, imgUri, name, res;
        if (props.board) {
            let board = props.board;
            boardId = board.id;
            imgUri = "http://bbs.wyy.ink:8080/images/" + board.img;
            name = board.name;
        } else {
            boardId = props.boardId;
            if (boardId == undefined) boardId = null;
            if (boardId == null) return;
            res = await http.get(`/board/${boardId}`);
            if (res.code != 0) {
                message.error(res.msg);
            }
            imgUri = "http://bbs.wyy.ink:8080/images/" + res.data.img;
            name = res.data.name;
        }
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

    useEffect(()=>{getBoard(props.boardId)}, [])

    const navigate = useNavigate();

    const handleClick = () => {
        let boardId;
        if (props.board) {
            boardId = props.board.id;
        } else {
            boardId = props.boardId;
        }
        navigate(`/board/${boardId}`);
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