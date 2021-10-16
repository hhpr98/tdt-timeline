import React from "react";
import "antd/dist/antd.css";
import { HashRouter, Route } from "react-router-dom";
import { HomePage } from "./Components/HomePage/HomePage";
import "./assets/css/App.css";
import { TimeSheet } from "./Components/TimeSheet/TimeSheet";
import { DataProvider } from "./Provider/DataProvider";
import { Button, Space } from "antd";
import { GithubFilled, FacebookFilled, YoutubeFilled } from '@ant-design/icons';

// https://www.svgbackgrounds.com/
// https://www.flaticon.com/
// https://icon-icons.com/

function App() {

  const redirect_blank = (url) => {
    var a = document.createElement('a');
    a.target = "_blank";
    a.href = url;
    a.click();
  }

  return (
    <div className="full">
      <DataProvider>
        <HashRouter>
          <Route exact path="/" component={HomePage} />
          <Route path="/timesheet/:className" component={TimeSheet} />
        </HashRouter>
      </DataProvider>

      <li className="footer-flex">
        <ul><Button shape="circle" icon={<GithubFilled />} size="large" onClick={() => redirect_blank("https://github.com/hhpr98")} /></ul>
        <ul><Button shape="circle" icon={<FacebookFilled />} size="large" style={{ color: "#4267b2" }} onClick={() => redirect_blank("https://www.facebook.com/nguyenhuuhoa.15.04.1998")} /></ul>
        <ul><Button shape="circle" icon={<YoutubeFilled />} size="large" style={{ color: "#EA4335" }} onClick={() => redirect_blank("https://www.youtube.com/channel/UCu4l-eJrIEknLQBjhRR_qDw")} /></ul>
      </li>

      <div className="copyright">Copyright @2021. From Ton Duc Thang with love ❤️</div>

    </div>
  );
}

export default App;
