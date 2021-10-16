import React from "react";
import "antd/dist/antd.css";
import { HashRouter, Route } from "react-router-dom";
import { HomePage } from "./Components/Home";

function App() {
  return (
    <HashRouter>
      <Route exact path="/" component={HomePage} />
    </HashRouter>
  );
}

export default App;
