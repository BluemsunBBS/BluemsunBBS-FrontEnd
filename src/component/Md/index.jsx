import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
import { Editor, Viewer } from '@bytemd/react'
import { useState } from 'react'
import './index.css'
import zhHans from "bytemd/lib/locales/zh_Hans.json";
import 'bytemd/dist/index.css'
import "highlight.js/styles/vs.css";

const plugins = [
  gfm(),highlight(),math()
  // Add more plugins here
]

function Md(){
  const [value, setValue] = useState('');
  return (
    <div className="page-wrap">
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