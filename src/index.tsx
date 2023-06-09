import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Router } from './Router';
import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { LayoutMenu } from './pages/LayoutMenu';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <LayoutMenu /> */}
    {/* <Layout className="layout">
      <Header style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
      </Header> */}
    <Router />
    {/* </Layout> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
