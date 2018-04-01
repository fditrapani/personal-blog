import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom'
import AppShell from './components/appshell/';
import Posts from './routes/posts';
import Post from './routes/post';
import About from './routes/about';
import NotFound from './routes/404';

class App extends Component {
  render() {
    const location = this.props.location;

    return (
      <AppShell location={ location }>
        <section className="page-main-inner">
          <Switch location={ location }>
            <Route path="/" exact component={ Posts } />
            <Route path="/about" component={ About } />
            <Route path="/post/:id/:slug" component={ Post } />
            <Route component={ NotFound } />
          </Switch>
        </section>     
      </AppShell>
    );
  }
}

export default withRouter(App);
