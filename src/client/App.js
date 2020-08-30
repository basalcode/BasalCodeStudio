import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Lobby from './component/Lobby/lobby';
import Blog from './component/Blog/Blog';
import Category from './component/Blog/Category';
import PostEditor from './component/Blog/PostEditor/PostEditor';
import CategoryEditor from './component/Blog/CategoryEditor';

import Login from './component/Auth/Login/Login';
import Signup from './component/Auth/Signup/Signup';


function App() {
  return (
    <div id="App">
      <Switch>
        <Route exact path="/" component={Lobby} />
        <Route path="/blog" component={Blog} />
        <Route path="/postEditor" component={PostEditor} />
        <Route path="/categoryEditor" component={CategoryEditor} />
        <Route path="/category/:id" component={Category} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* <Route component={Error} /> */}
      </Switch>
    </div>
  );
}

export default App;
