import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ConfigContext from "./components/common/ConfigContext";
import config from "./assets/config.json";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ConfigContext.Provider value={config}> */}
    <Router basename={"/Powertek-GUI/"}>
      <App />
    </Router>
    {/* </ConfigContext.Provider> */}
  </React.StrictMode>
);
