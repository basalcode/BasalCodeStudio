import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null
    }
  }

  componentDidMount() {
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
        <div>
          Wow, {this.state.result}
        </div>
      </div>
    );
  }
}

export default App;
