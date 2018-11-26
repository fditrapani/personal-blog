import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom'

import Posts from './routes/posts';
import Post from './routes/post';
import About from './routes/about';
import NotFound from './routes/404';

import Navigation from './components/navigation/';
import './sass/App.css';

class App extends Component {
  componentWillReceiveProps() {
    this.refs.appShellContainer.scrollTop = 0;
  }

  render() {
    return (
      <div className="app-shell">
        <Navigation location={ this.props.location } />

        <div ref="appShellContainer" className="app-shell__content">
          <Switch>
             <Route path="/" exact component={ Posts } />
             <Route path="/about" component={ About } />
             <Route path="/post/:id/:slug" component={ Post } />
             <Route component={ NotFound } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
