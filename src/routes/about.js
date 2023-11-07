import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { config } from "../config";
import { Link } from 'react-router-dom';
import '../sass/routes/about.scss';
import Filippo from '../components/filippo'
import Chevronicon from '../components/icons/chevronicon';

class About extends Component {
  constructor() {
      super();

      this.state = {
        isLoaded: false,
        isNotFound: false,
      };
    } 
    renderContent = () => {
        return (
          <div className="app-shell__content-wrapper">
            <div className="about__content">
              <div ref="LogoContainer" className="brand">
                <div className="grid">
                  <Filippo />
                </div>
              </div>

              <div className='designing_since_wrapper'>
                <div>
                  <span className="designing_since designing_text">Designing</span>
                  <span className='since2004_text'>
                    <span className='designing_since'>since</span>
                    <span className='year'>2004</span>
                  </span>
                </div>
              </div>

              <div className='about_section'>
                <div className='about_content'>
                  <div className='about_text'>
                    Filippo Di Trapani is a Design leader who specializes in strategic thinking and working with teams to build products people love. Currently based in Ottawa, Canada crafting the future of commerce with <a href="https://remx.xyz" className='company_link'>remx.xyz</a>.
                    </div>
                  
                  <ul className='about_links'>
                    <li className='about_links__link_wrapper'>
                      <Link className="about_links__link" to="/work">
                        Work <Chevronicon />
                      </Link>
                    </li>
                    <li className='about_links__link_wrapper'>
                      <Link className="about_links__link" to="/blog">
                        Blog <Chevronicon />
                      </Link>
                    </li>
                    <li className='about_links__link_wrapper'>
                      <Link className="about_links__link" to="/contact">
                        Contact <Chevronicon />
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className='vision_wrapper'>
                  <span className='vision_word'>vision</span>
                  <span className='vision_word vision_word--strategy'>strategy</span>
                  <span className='vision_word vision_word--execution'>execution</span>
                </div>
              </div>
            </div>
          </div>
        )
    }

    render() {
      if( this.state.isNotFound ) {
        return <Redirect to='/404'/>;
      }

      return (
        <div>
          <Helmet>
              <title>About | Filippo Di Trapani</title>
              <meta name="description"               content="The professional website of Fiippo Di Trapani. A product designer based out of Ottawa, Canada. Take a peak into his process as he share's his thoughts and experiences on design."/>
              <meta property="og:url"                content={ config.url } />
              <meta property="og:type"               content="website" />
              <meta property="og:title"              content="About | Filippo Di Trapani" />
              <meta property="og:description"        content="Professional website for a product designer based in Ottawa, Canada. Take a peak into his process as he share's his thoughts and experiences on design." />
              <meta property="og:image"              content={ config.siteBanner } />
              <meta name="twitter:image"             content={ config.siteBanner } />
              <meta name="twitter:creator"           content="@filippodt" />
              <meta name="twitter:card"              content="summary_large_image" />
              <meta name="twitter:title"             content="About | Filippo Di Trapani" />
          </Helmet>

          { this.renderContent() }
        </div>
      );
    }
}

export default About;