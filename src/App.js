import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import AppShell from './components/appshell/';
import Posts from './routes/posts';
import About from './routes/about';

class App extends Component {
  render() {
    const location = this.props.location;
    const currentKey = location.pathname.split('/')[1] || '/'
    const timeout = { enter: 800, exit: 600 }

    return (
      <AppShell location={ location }>
        <TransitionGroup component="main" className="page-main">
          <CSSTransition key={currentKey} timeout={timeout} classNames="fade" appear>
            <section className="page-main-inner">
              <Switch location={ location }>
                <Route path="/" exact component={ Posts } />
                <Route path="/about" component={ About } />
                <Route component={ Posts } />
              </Switch>
            </section>
          </CSSTransition>
        </TransitionGroup>        
      </AppShell>
    );
  }
}

export default withRouter(App);
