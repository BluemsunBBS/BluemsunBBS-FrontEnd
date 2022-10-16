import { useState, useEffect } from 'react'
import './App.css'

import axios from 'axios'
import Nav from './Nav/Nav'
import Log from './Log/Log'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='root'>
      
      <Nav/>
      <div className="searchContainer">
        <input type="text" className="inputBox"></input>
        <button className="searchBtn">BBS搜索</button>
      </div>
      <br/><br/>
      <Log/>
    </div>
  )
}

export default App