import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import AuthView from "./Components/AuthView/AuthView";
import Layout from './Components/Layout';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthView>
        <Layout />
      </AuthView>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
