import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Lobby from './component/Lobby/lobby';
import Blog from './component/Blog/Blog';
import Auth from './component/Auth/Auth';

const App = () => {
  return (
    <div id="App">
      <Switch>
        <Route exact path="/" component={Lobby} />
        <Route path="/blog" component={Blog} />
        <Route path="/auth" component={Auth} />
        {/* <Route component={Error} /> */}
      </Switch>
    </div>
  );
}

export default App;
