import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './client/reducer/index'
import rootSaga from './client/saga/index'

import { composeWithDevTools } from 'redux-devtools-extension';
import reduxLogger from 'redux-logger';

import { BrowserRouter as Router } from 'react-router-dom';

import App from 'page/App';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(sagaMiddleware, reduxLogger)
));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);