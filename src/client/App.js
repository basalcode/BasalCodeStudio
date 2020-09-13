import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainLobby from 'component/MainLobby/MainLobby'
import Blog from 'component/Blog/Blog';
import Auth from 'component/Auth/Auth';

import './App.scss';
import 'asset/fontello/css/fontello.css';

const App = () => {
  return (
    <div id="App">
      <Switch>
        <Route exact path="/" component={MainLobby} />
        <Route path="/blog" component={Blog} />
        <Route path="/auth" component={Auth} />
        {/* <Route component={Error} /> */}
      </Switch>
    </div>
  );
}

export default App;
