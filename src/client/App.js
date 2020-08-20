import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import store from './redux/store';
import Lobby from './component/Lobby/lobby';
import Blog from './component/Blog/Blog';
import Login from './component/Auth/Login';

function App() {
  return (
    <div id="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Lobby} />
            <Route path="/blog" component={Blog} />
            <Route path="/login" component={Login} />
            <Route component={Error} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
