import React, { Component } from 'react';
import Navigation from './components/navigation/';
import './sass/App.css';

class App extends Component {
  render() {
    return (
      <div className="app-shell">
        <Navigation />

        <div className="app-shell__content">
           <h1>Vafanculo</h1>
           <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </div>
    );
  }
}

export default App;
