import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { deepPurple, cyan } from "@mui/material/colors";
import reduxStore from "./store/store";
import { Provider } from "react-redux";
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: deepPurple,
    default: {
      main: "#64748B",
      contrastText: "#fff",
    },
    tertiary: {
      main: cyan,
    },
  },
});

const store = reduxStore();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
