import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducerCore from './client/reducer/index'

import { BrowserRouter as Router } from 'react-router-dom';

import App from './client/App';

const store = createStore(reducerCore);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);
{/* <React.StrictMode>
</React.StrictMode> */}