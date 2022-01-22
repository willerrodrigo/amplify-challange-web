import React from "react";
import ReactDOM from "react-dom";
import Amplify, { AuthModeStrategyType } from "aws-amplify";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import config from "./aws-exports";

Amplify.configure({
  ...config,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
