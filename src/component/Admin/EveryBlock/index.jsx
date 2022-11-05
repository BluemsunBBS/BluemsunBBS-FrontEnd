import style from './index.module.css';
import { Drawer } from 'antd';
import { useEffect,useState } from 'react';

export default function EveryBlock(props) {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const board = props.board;
    var uri = "http://bbs.wyy.ink:8080/images/" + board.img;
    const handleClick = () => {
        window.open(`/board/${board.id}`);
    }
    return (
        <div className={style.msgBox}>
            <img className={style.boardImg} src={uri} onClick={handleClick}></img>
            <div className={style.text1}>{board.name}</div>
            <span className={style.des}>{board.description}</span>
            <button className={style.btn1} onClick={() => props.onDelete(board.id)}>删除版块</button>
            <button className={style.btn1} onClick={showDrawer}>管理版主</button>
            <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </div>
    )
}