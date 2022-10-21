// import React from 'react';
// import ReactDOM from 'react-dom';
// import ReactMarkdown from 'react-markdown'
// import style from './index.module.css'
// import { Viewer } from '@bytemd/react'

import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
import { Editor, Viewer } from '@bytemd/react'
import style from './index.module.css'
import 'bytemd/dist/index.css'
import "highlight.js/styles/vs.css";

const plugins = [
    gfm(), highlight(), math()
    // Add more plugins here
]

function Markdown(props) {

    const markdownText = props.text;

    // const plugins = [
    //     gfm(),
    //     // Add more plugins here
    //   ]

    // return (
    //     <div className={style.md}>
    //         <ReactMarkdown children={markdownText} className="markdown-html" />
    //     </div>

    // )
    return (
        <div className={style.md}>
            <Viewer
                // 内部的值
                value={markdownText}
                // 插件
                plugins={plugins}
            />
        </div>
    )
}
export default Markdown;