import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
import { Editor, Viewer } from '@bytemd/react'
import { useState } from 'react'
import './index.css'

const plugins = [
  gfm(),highlight(),math()
  // Add more plugins here
]

function Md(){
  const [value, setValue] = useState('')

  return (
    <Editor
      value={value}
      plugins={plugins}
      onChange={(v) => {
        setValue(v)
      }}
    />
  )
}
export default Md;