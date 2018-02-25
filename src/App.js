import React, { Component } from 'react';
import Logo from './components/logo/';
import Navigation from './components/navigation/';
import './sass/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Navigation />

          <h1 className="App-title">Welcome to React AA</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
