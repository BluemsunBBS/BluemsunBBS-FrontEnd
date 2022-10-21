import React from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown'
import style from './index.module.css'

const markdownText = `# 123
- 3123
    - 123
---
# 很多年的
jsclaskmcklnscl

jwodjmlaml

ioocnlkncmlkamslk

ewhfioheifnklcnksbnifhqowjdl;

nocivhweiocnklasnvejc

hidsvlnkslv

csnckasmc.

hslcnl;

<div></div>

hwncklansckasnc

\`\`\`cpp
#include<bits/stdc++.h>
using namespace std;
int main() {
    return 0;
}
\`\`\`

cnsdcnklascmalnslcnc`

function Markdown() {
    return (
        <div className={style.md}>
            <ReactMarkdown children={markdownText} className="markdown-html" />
        </div>
    )
}
export default Markdown;