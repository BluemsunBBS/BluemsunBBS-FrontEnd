import gfm from '@bytemd/plugin-gfm'
import { Editor, Viewer } from '@bytemd/react'

const plugins = [
  gfm(),
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