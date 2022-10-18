import "antd/dist/antd.css";
import './App.css'

import LoginPage from './page/LoginPage';
import NotfoundPage from "./page/NotfoundPage";
import HomePage from './page/HomePage';

import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage/>} />
        <Route path="/">
          <Route path="login" element={<LoginPage/>} />
          <Route path="home" element={<HomePage/>} />
        </Route>
        <Route path="*" element={<NotfoundPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App