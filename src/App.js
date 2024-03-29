import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Posts from './routes/posts';
import Work from './routes/work';
import Post from './routes/post';
import Casestudy from './routes/case-study';
import About from './routes/about';
import Contact from './routes/contact';
import NotFound from './routes/404';

import Navigation from './components/navigation/';
import './sass/App.scss';

class App extends Component {
  componentDidMount(){
    window.ga('create', 'UA-22176787-1', 'auto');
    
  }

  setPageAndSendToGA = url => {
    window.ga('set', 'page', url);
    window.ga('send', 'pageview');
  };

  trackGoogleAnalytics = location => {
      if (window.ga) {
        let url = location.pathname;
        this.setPageAndSendToGA(url);
      }
    };

  render() {
    this.trackGoogleAnalytics(this.props.location);

    return (
      <div className="app-shell">
        <Navigation location={ this.props.location } />

        <div ref="appShellContainer" className="app-shell__content">
          <TransitionGroup className="transition-wrapper">
            <CSSTransition
              key={ this.props.location.key }
              classNames="my-node"
              timeout={400}
            >
              <Switch location={ this.props.location } >
                 <Route path="/" exact component={ About } />
                 <Route path="/blog" component={ Posts } />
                 <Route path="/work" exact component={ Work } />
                 <Route path="/contact" exact component={ Contact } />
                 <Route path="/page/:page" exact component={ Posts } />
                 <Route path="/post/:id/:slug" component={ Post } />
                 <Route path="/casestudy/:id/:slug" component={ Casestudy } />
                 <Route component={ NotFound } />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
