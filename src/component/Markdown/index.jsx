import React from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown'
const markdownText = "# This is First Paragraph!"

function Markdown(){
    return <ReactMarkdown children={markdownText} className="markdown-html"/>
}
export default Markdown;