import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null
    }
  }

  componentDidMount() {
    console.log('A');
    console.log('B');
    console.log('C');
    fetch('/hello')
    .then(function(response) {
      return response.json();
    })
    .then(parsed => {
      this.setState({result: parsed.result});
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <div>
          Wow, {this.state.result}
        </div>
      </div>
    );
  }
}

export default App;
