import "antd/dist/antd.css";
import './App.css'

import LoginPage from './page/LoginPage';
import NotfoundPage from "./page/NotfoundPage";
import HomePage from './page/HomePage';
import SetUserInfo from './page/SetUserInfo'

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { http } from "./utils/http";
import { getUserInfo } from "./utils/func";

function App() {

  useEffect(()=>{
    async function fetchData() {
      if (!localStorage.getItem("token")) return;
      var res = await http.get("/account/" + getUserInfo("id"));
      localStorage.setItem("data", JSON.stringify(res.data));
    }
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage/>} />
        <Route path="/">
          <Route path="login" element={<LoginPage/>} />
          <Route path="home" element={<HomePage/>} />
          <Route path="setUserInfo" element={<SetUserInfo/>}></Route>
          {/* <Route path="region" element={<RegionPage/>}></Route> */}
        </Route>
        <Route path="*" element={<NotfoundPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App