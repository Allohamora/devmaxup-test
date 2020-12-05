import 'regenerator-runtime/runtime'; // fix parcel async/await bug
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryCacheProvider, QueryCache } from 'react-query';

const queryCache = new QueryCache();

const root = (
  <React.StrictMode>
    <BrowserRouter>
      <ReactQueryCacheProvider queryCache={queryCache} >
        <App />
      </ReactQueryCacheProvider>
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.render(
  root,
  document.getElementById('root')
);
