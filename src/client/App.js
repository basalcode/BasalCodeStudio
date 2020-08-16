import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Lobby from './component/Lobby/lobby';

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
          <Route path="/" component={Lobby}></Route>
        </Switch>
        
      </div>
    );
  }
}

export default App;
