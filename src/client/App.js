import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Lobby from './component/Lobby/lobby';
import Blog from './component/Blog/Blog';
import Category from './component/Blog/Category';
import Login from './component/Auth/Login';
import Signup from './component/Auth/Signup';


function App() {
  return (
    <div id="App">
      <Switch>
        <Route exact path="/" component={Lobby} />
        <Route path="/blog" component={Blog} />
        <Route path="/category" component={Category} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* <Route component={Error} /> */}
      </Switch>
    </div>
  );
}

export default App;
