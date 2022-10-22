import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
import { Editor, Viewer } from '@bytemd/react'
import { useState, useEffect } from 'react'
import './index.css'
import zhHans from "bytemd/lib/locales/zh_Hans.json";
import 'bytemd/dist/index.css'
import "highlight.js/styles/vs.css";
import { Modal, Checkbox, Col, Row, Radio } from 'antd';
import { http } from './../../utils/http'

const plugins = [
  gfm(), highlight(), math()
  // Add more plugins here
]

function Md() {
  const APIResult = {
    page: 0,
    size: 0,
    rows: [],
    total: 0
  }

  const [boardData, setBoardData] = useState(APIResult);
  async function fetchBoard() {
    var res = await http.get(`/board/`, {
      params: {
        page: 1,
        size: 10
      }
    });
    if (res.code != 0) {
      message.error(res.msg);
    } else {
      console.log(res.data.rows)
      setBoardData(res.data);
    }
  }
  useEffect(() => { fetchBoard(); }, [])

  // console.log(boardData.rows.map(board));
  const [value, setValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articleTitle,setArticleTitle] = useState('');
  const [articleText,setArticleText] = useState('');
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    var res = http.post(`/article/`,{
      params:{
        title:articleTitle,
        text:articleText,
        boardId:value
      }
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const titleChange = (e) =>{
    setArticleTitle(e.target.value);
  }
  const textChange = (e) =>{
    setArticleText(e.target.value);
  }
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="page-wrap">
      <div className='mdBox'>
        <span className='text1'>文章标题</span>
        <input type="text" className='mdBox-input' onChange={(e)=>titleChange(e)} value={articleTitle}></input>
        <button className='mdBox-btn1'>存草稿</button>
        <button className='mdBox-btn2' type="primary" onClick={showModal}>发布文章</button>
        <Modal title="请选择文章类别" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} cancelText='关闭' okText='确认发布'>
          <Radio.Group onChange={(e)=>onChange(e)} value={value}>
            {boardData.rows.map((board) => (
              <Radio value={board.name} name={board.id}>{board.name}</Radio>
            ))}
          </Radio.Group>
        </Modal>
      </div>
      <Editor
        // 语言
        locale={zhHans}
        // 内部的值
        value={articleText}
        // 插件
        plugins={plugins}
        // 动态修改值
        onChange={(e)=>textChange(e)}
      />
    </div>
  )
}
export default Md;




