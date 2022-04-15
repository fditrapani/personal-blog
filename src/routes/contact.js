import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { config } from "../config";
import '../sass/routes/about.scss';
import Footer from '../components/footer'

class Connect extends Component {
    renderContent = () => {
      return (
        <div className="app-shell__content-wrapper about__content-wrapper">
          <h1>Get in touch with me</h1>
        </div>
      )
    }

    render() {
      return (
        <div>
          <Helmet>
              <title>Flow: An online journal by Filippo Di Trapani</title>
              <meta name="description"               content="Personal website for designer based in Ottawa, 
                  Canada. Take a peak into his process as he share's his thoughts and experiences on design."/>
              <meta property="og:url"                content={ config.url } />
              <meta property="og:type"               content="website" />
              <meta property="og:title"              content="Flow: An online journal by Filippo Di Trapani" />
              <meta property="og:description"        content="Personal website for designer based in Ottawa, 
                  Canada. Take a peak into his process as he share's his thoughts and experiences on design." />
              <meta property="og:image"              content={ config.siteBanner } />
          </Helmet>

          { this.renderContent() }
        </div>
      );
    }
}

export default Connect;