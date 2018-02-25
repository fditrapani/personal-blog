import React, { Component } from 'react';
import Navigation from '../navigation/';
import '../../sass/App.css';

class AppShell extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="app-shell">
        <Navigation />

        <div className="app-shell__content">
           { children }
        </div>
      </div>
    );
  }
}

export default AppShell;
