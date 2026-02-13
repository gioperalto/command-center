import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initDatadogBrowser } from "./datadog/browser";
import "./styles/index.css";

initDatadogBrowser();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
