import style from './index.module.css'

export default function EveryFollowBlock(props) {
    const board = props.board;

    return (

        <div className={style.notificationBox} >
            <div className={style.text1}>{board.name}</div>
        </div>

    )
}