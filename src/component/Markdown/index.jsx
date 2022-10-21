import React from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown'
import style from './index.module.css'

function Markdown(props) {

    const markdownText = props.text;

    return (
        <div className={style.md}>
            <ReactMarkdown children={markdownText} className="markdown-html" />
        </div>
    )
}
export default Markdown;