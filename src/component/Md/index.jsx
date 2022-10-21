import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
import { Editor, Viewer } from '@bytemd/react'
import { useState } from 'react'
import './index.css'
import zhHans from "bytemd/lib/locales/zh_Hans.json";
import 'bytemd/dist/index.css'
import "highlight.js/styles/vs.css";
import { Modal } from 'antd';

const plugins = [
  gfm(), highlight(), math()
  // Add more plugins here
]

function Md() {
  const [value, setValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="page-wrap">
      <div className='mdBox'>
        <span className='text1'>文章标题</span>
        <input type="text" className='mdBox-input' value="【无标题】"></input>
        <button className='mdBox-btn1'>存草稿</button>
        <button className='mdBox-btn2' type="primary" onClick={showModal}>发布文章</button>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
      <Editor
        // 语言
        locale={zhHans}
        // 内部的值
        value={value}
        // 插件
        plugins={plugins}
        // 动态修改值
        onChange={v => setValue(v)}
      />
    </div>
  )
}
export default Md;