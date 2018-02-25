import React, { Component } from 'react';
import AppShell from '../components/appshell/';

class About extends Component {
  render() {
    return (
      <AppShell>
         <h1>Aboot</h1>
         <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </AppShell>
    );
  }
}

export default About;
