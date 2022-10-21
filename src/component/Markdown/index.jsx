import React from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown'
const markdownText = `# 123
- 3123
    - 123
---
# 很多年的`

function Markdown(){
    return <ReactMarkdown children={markdownText} className="markdown-html"/>
}
export default Markdown;