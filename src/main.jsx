import { worker } from "./mocks/browser.js";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

if (process.env.NODE_ENV === "development") {
  worker.start({
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router basename={"/Powertek-GUI/"}>
      <App />
    </Router>
  </React.StrictMode>
);
