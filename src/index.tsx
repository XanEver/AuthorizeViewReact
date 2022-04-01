import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import { AuthView } from './Components/AuthView/AuthView';
import Layout from './Components/Layout';
import routes from './Routing/routs';

const { AuthorizedView,NonAuthorizedView } = AuthView

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthView >
        <AuthorizedView>
          <Layout routes={routes}/>
        </AuthorizedView>
        <NonAuthorizedView/>
      </AuthView>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
