import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import AppShell from './components/appshell/';
import Posts from './routes/posts';
import About from './routes/about';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>

      <Route component={ AppShell }>
        <Route path="/" component={ Posts }/>
    	<Route path="/about" component={ About }/>
      </Route>
        
      </Router>
    );
  }
}

export default App;
