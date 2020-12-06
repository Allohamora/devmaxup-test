import 'regenerator-runtime/runtime'; // fix parcel async/await bug
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryCacheProvider, QueryCache } from 'react-query';
import { ToastContainer } from 'react-toastify';

const queryCache = new QueryCache();

const root = (
  <React.StrictMode>
    <BrowserRouter>
      <ReactQueryCacheProvider queryCache={queryCache} >
        <App />
        <ToastContainer position="bottom-right" />
      </ReactQueryCacheProvider>
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.render(
  root,
  document.getElementById('root')
);
