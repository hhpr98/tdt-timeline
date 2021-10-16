import React from "react";
import "antd/dist/antd.css";
import { HashRouter, Route } from "react-router-dom";
import { HomePage } from "./Components/Home";
import "./assets/css/App.css";
// https://www.svgbackgrounds.com/

function App() {
  return (
    <div className="test">
      <HashRouter>
        <Route exact path="/" component={HomePage} />
      </HashRouter>
    </div>
  );
}

export default App;
