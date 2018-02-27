import React, { Component } from 'react';
import Navigation from '../navigation/';
import '../../sass/App.css';

class AppShell extends Component {
  componentWillReceiveProps() {

      setTimeout(function() { 
        this.refs.appShellContainer.scrollTop = 0; 
      }.bind(this), 200);
     
  }
  
  render() {
    const { children } = this.props;
    return (
      <div className="app-shell">
        <Navigation location={ this.props.location } />

        <div ref="appShellContainer" className="app-shell__content">
           { children }
        </div>
      </div>
    );
  }
}

export default AppShell;
