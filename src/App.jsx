import "antd/dist/antd.css";
import './App.css'

import LoginPage from './page/LoginPage';
import NotfoundPage from "./page/NotfoundPage";
import HomePage from './page/HomePage';
import SetUserInfo from './page/SetUserInfo'
import RegionPage from "./page/RegionPage";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { http } from "./utils/http";
import { getUserInfo } from "./utils/func";
import TestPage from "./page/TestPage";

function App() {

  useEffect(()=>{
    async function fetchData() {
      if (!localStorage.getItem("token")) return;
      var res = await http.get("/account/" + getUserInfo("id"));
      // var avatarUri = getUserInfo("avatar_uri");
      // if (res.data.avatar_uri != avatarUri || !localStorage.getItem("imgBase64")) {
      //   let resImg = await http.get("/images/" + res.data.avatar_uri);
      //   let blob = new Blob([resImg], { type: "image" });
      //   const getBase64 = (img, callback) => {
      //     const reader = new FileReader();
      //     reader.addEventListener('load', () => callback(reader.result));
      //     reader.readAsDataURL(img);
      //   };
      //   getBase64(blob, (url) => {
      //     localStorage.setItem("imgBase64", url);
      //   })
      // }
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
          <Route path="test" element={<TestPage/>}></Route>
          <Route path="region" element={<RegionPage/>}></Route>
        </Route>
        <Route path="*" element={<NotfoundPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App