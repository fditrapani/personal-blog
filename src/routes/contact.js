import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { config } from "../config";
import '../sass/routes/contact.scss';
import Footer from '../components/footer';

class Connect extends Component {
    renderContent = () => {
      return (
        <div className="app-shell__content-wrapper">
          <div className="container contact-wrapper">
            <div className="content content-wrapper">
              <h1 className="contact__title">Let's talk</h1>
              <p className="contact__copy">Thanks for stopping by! Reach out to me on LinkedIn to connect.</p>
              <Footer />
            </div>
          </div>
        </div>
      )
    }

    render() {
      return (
        <div>
          <Helmet>
              <title>Contact | Filippo Di Trapani</title>
              <meta name="description"               content="The professional website of Fiippo Di Trapani. A product designer based out of Ottawa, Canada. Take a peak into his process as he share's his thoughts and experiences on design."/>
              <meta property="og:url"                content={ config.url } />
              <meta property="og:type"               content="website" />
              <meta property="og:title"              content="Contact | Filippo Di Trapani" />
              <meta property="og:description"        content="The professional website of Fiippo Di Trapani. A product designer based out of Ottawa, Canada. Take a peak into his process as he share's his thoughts and experiences on design."/>
              <meta property="og:image"              content={ config.siteBanner } />
              <meta name="twitter:image"             content={ config.siteBanner } />
              <meta name="twitter:creator"           content="@filippodt" />
              <meta name="twitter:card"              content="summary_large_image" />
              <meta name="twitter:title"             content="Contact | Filippo Di Trapani" />
          </Helmet>

          { this.renderContent() }
        </div>
      );
    }
}

export default Connect;