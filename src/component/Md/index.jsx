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
import { openNotification } from '../../utils/notification'
import { useNavigate, useParams } from 'react-router';
import { Input } from 'antd';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';


const { TextArea } = Input;

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

  const [summary, setSummary] = useState('');
  const onChangeSummary = (e) => {
    console.log('Change:', e.target.value);
    setSummary(e.target.value);
  };

  const navigate = useNavigate();
  const params = useParams();
  console.log(params.id);

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
  const [radio, setRadio] = useState({
    value: "",
    id: ""
  });
  const [whichOpen, checkWhichOpen] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articleTitle, setArticleTitle] = useState('');
  const [articleText, setArticleText] = useState('');
  const [articleFile, setArticleFile] = useState('');
  const [ifSubmitted, setSubmitted] = useState(2);
  const showModal = (num) => {
    checkWhichOpen(num);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    async function submitArticle() {
      // ??????????????????????????????????????????
      if (whichOpen == 1 && ifSubmitted == 2) {
        var res = await http.post(`/article/`, {
          title: articleTitle,
          text: articleText,
          files: articleFile,
          board_id: radio.id
        }
        );
        if (res.code == 0) {
          openNotification("success", "????????????", "????????????", 1);
          setTimeout(() => { navigate(`/article/${res.data.id}`); }, 1000);
        }
      }
      // ?????????????????????????????????????????????
      if (whichOpen == 0 && ifSubmitted == 2) {
        var res = await http.post(`/article/`, {
          title: articleTitle,
          text: articleText,
          files: articleFile,
          board_id: radio.id,
          approved: 2
        }
        );
        if (res.code == 0) {
          openNotification("success", "???????????????", "????????????", 1);
          setTimeout(() => { navigate(`/home`); }, 1000);
        }
      }
      // ?????????????????????????????????????????????
      if (whichOpen == 1 && ifSubmitted == 1) {
        var res = await http.put(`/article/${params.id}`, {
          title: articleTitle,
          text: articleText,
          files: articleFile,
          board_id: radio.id
        }
        );
        if (res.code == 0) {
          openNotification("success", "??????????????????", "????????????", 1);
          setTimeout(() => { navigate(`/article/${res.data.id}`); }, 1000);
        }
      }
      // ????????????????????????????????????????????????
      if (whichOpen == 0 && ifSubmitted == 0) {
        var res = await http.put(`/article/${params.id}`, {
          title: articleTitle,
          text: articleText,
          files: articleFile,
          board_id: radio.id,
          approved: 2
        }
        );
        if (res.code == 0) {
          openNotification("success", "??????????????????", "????????????", 1);
          setTimeout(() => { navigate(-1); }, 1000);
        }
      }
      // ?????????????????????????????????????????????
      if (whichOpen == 1 && ifSubmitted == 0) {
        var res = await http.put(`/article/approve/${params.id}`, {
          title: articleTitle,
          text: articleText,
          files: articleFile,
          board_id: radio.id
        }
        );
        if (res.code == 0) {
          openNotification("success", "????????????", "????????????", 1);
          setTimeout(() => { navigate(`/article/${res.data.id}`); }, 1000);
        }
      }

    }
    submitArticle();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const titleChange = (e) => {
    setArticleTitle(e.target.value);
  };
  const textChange = (e) => {
    setArticleText(e);
  };
  const onChange = (e) => {
    setRadio({
      value: e.target.value,
      id: e.target.id
    });
  };

  useEffect(() => {
    // write???????????????
    if (params.id) {
      async function fetchInfo(params) {
        var res = await http.get(`/article/${params.id}`, {
          params: {
            page: 1,
            size: 10
          }
        });
        if (res.code != 0) {
          message.error(res.msg);
        } else {
          setArticleTitle(res.data.title);
          setArticleText(res.data.text);
        }
        if (res.data.approved == 2) {
          setSubmitted(0);
        }
        if (res.data.approved == 1) {
          setSubmitted(1);
        }
      }
      fetchInfo(params);
    } else {
      setSubmitted(2);
    }
  }, [])
  // write??????????????????????????????????????????
  console.log(params);

  const props = {
    name: 'file',
    action: "http://bbs.wyy.ink:8080/file/upload",
    maxCount:'1',
    headers: { token: localStorage.getItem("token") },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name}???????????????`);
        setArticleFile(info.file.response.data);
        console.log(articleFile);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name}???????????????`);
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  
  return (
    <div className="page-wrap">
      <div className='mdBox'>
        <span className='text1'>????????????</span>
        <input type="text" className='mdBox-input' onChange={(e) => titleChange(e)} value={articleTitle}></input>
        {(ifSubmitted == 1) ? (<></>) : (<button className='mdBox-btn1' type="primary" onClick={() => { showModal(0) }}>?????????</button>)}

        <button className='mdBox-btn2' type="primary" onClick={() => { showModal(1) }}>????????????</button>
        <Modal title="?????????????????????" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} cancelText='??????' okText='????????????'>
          <div className='text2'>?????????????????????</div>
          <Radio.Group onChange={(e) => onChange(e)} value={radio.value}>
            {boardData.rows.map((board) => (
              <Radio key={board.id} value={board.name} id={board.id}>{board.name}</Radio>
            ))}
          </Radio.Group>
          <div className='text3'>?????????????????????</div>
          {/* <TextArea showCount maxLength={100}/> */}
          <TextArea showCount maxLength={200} onChange={onChangeSummary} value={summary} />
        </Modal>
      </div>

      <Editor
        // ??????
        locale={zhHans}
        // ????????????
        value={articleText}
        // ??????
        plugins={plugins}
        // ???????????????
        onChange={(e) => textChange(e)}
        //????????????
        uploadImages={async (files) => {
          var data = new FormData();
          data.append("file", files[0]);
          var res = await http.post('/file/upload/', data);

          console.log(res.data);
          return [
            {
              url: "http://bbs.wyy.ink:8080/images/" + res.data,
            },
          ];
        }}
      />
      <div className='text4Box'>
        <Upload {...props}>
          <Button icon={<UploadOutlined />} className='btnOfUpload'>????????????</Button>&nbsp;&nbsp;
          <Button className='btnOfUpload'>??????????????????</Button>
        </Upload>
      </div>
    </div>
  )
}
export default Md;




