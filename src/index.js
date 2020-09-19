/* module */
// react
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

// dev-tool
import reduxLogger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

/* store */
import rootReducer from './client/store/reducer/index'
import rootSaga from './client/store/saga/index'

/* component */
import App from 'component/page/App';

/* style */
import 'style/index.scss';
import 'asset/fontello/css/fontello.css';

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