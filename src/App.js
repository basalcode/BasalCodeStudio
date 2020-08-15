import React from 'react';
import './App.css';
import Lobby from './lobby/lobby';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <div id="App">
        <Lobby></Lobby>
      </div>
    );
  }
}

export default App;
