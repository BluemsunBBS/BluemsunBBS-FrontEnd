import { useState, useEffect } from 'react'
import "antd/dist/antd.css";
import './App.css'
import LoginPage from './page/LoginPage/LoginPage';

function App() {

  return (
    <div className='root'>
      {/* <LoginPage/> */}
      <LoginPage/>
    </div>
  )
}

export default App