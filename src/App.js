import React from "react";
import "antd/dist/antd.css";
import { HashRouter, Route } from "react-router-dom";
import { HomePage } from "./Components/HomePage/HomePage";
import "./assets/css/App.css";
import { TimeSheet } from "./Components/TimeSheet/TimeSheet";
import { DataProvider } from "./Provider/DataProvider";
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';
// https://www.svgbackgrounds.com/
// https://www.flaticon.com/

function App() {
  return (
    <div className="full">
      <DataProvider>
        <HashRouter>
          <Route exact path="/" component={HomePage} />
          <Route path="/timesheet/:className" component={TimeSheet} />
        </HashRouter>
      </DataProvider>

      <Footer
        columns={[
          // {
          //   icon: (
          //     <img src="https://img.icons8.com/nolan/64/github.png" />
          //   ),
          //   title: 'Github',
          //   url:"https://github.com",
          //   description: 'github',
          //   openExternal: true,
            
          // }
        ]}
        bottom="Copyright @2021 ❤️ by hhpr98"
        style={{ color: "white", marginTop: 100 }}
      />
    </div>
  );
}

export default App;
