import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Lobby from './component/Lobby/lobby';
import Blog from './component/Blog/Blog';
import Login from './component/Auth/Login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <div id="App">
        <Switch>
          <Route exact path="/" component={Lobby}></Route>
          <Route path="/blogMain" component={Blog}></Route>
          <Route path="/blogMain" component={Login}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
