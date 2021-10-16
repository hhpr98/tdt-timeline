import React from "react";
import "antd/dist/antd.css";
import { HashRouter, Route } from "react-router-dom";
import { HomePage } from "./Components/HomePage/HomePage";
import "./assets/css/App.css";
import { TimeSheet } from "./Components/TimeSheet/TimeSheet";
import { DataProvider } from "./Provider/DataProvider";
// https://www.svgbackgrounds.com/

function App() {
  return (
    <div className="full">
      <DataProvider>
        <HashRouter>
          <Route exact path="/" component={HomePage} />
          <Route path="/timesheet/:className" component={TimeSheet} />
        </HashRouter>
      </DataProvider>
    </div>
  );
}

export default App;
