import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { config } from "../config";
import './about.css';

class About extends Component {
  constructor() {
      super();

      this.state = {
        isLoaded: false,
        isNotFound: false,
        postData: {},
      };
    }

    componentDidMount() {
      
    }

    renderContent = () => {
      return (
        <div className="app-shell__content-wrapper">
          <Helmet>
              <title>{ "Filippo Di Trapani" }</title>
              <meta name="description" content="A designer website by Filippo Di Trapani."/>
          </Helmet>

          <div className="grid intro">
            <div className="avatar-wrapper">
              <div className="avatar">
                <img className="avatar__image" src="/images/avatar.png" alt="Filippo"/>
              </div>
            </div>

            <div className="intro__copy content">
              <h1 className="intro__title intro__title--about">Howzit!</h1>
              <p className="intro__paragraph">My name is Filippo and I’m a designer that works with digital products. My mission in life is to help people improve their lives with technology. This is my personal site and I use it to share my thoughts, experiments, and work. Keep reading to learn a little more about myself.</p>
            </div>
          </div>

          <div className="grid">
            <div className="background-title content">
              <h2 className="title">Background</h2>
            </div>
          </div>

          <div className="grid">
            <div className="background-copy content">
              <p>I was born and raised in Johannesburg, South Africa, by two loving parents. I wouldn't be where I am today if it wasn't for them and truly appreciate everything they have done, and continue to do for me today. Growing up in an Italian household, I not only ate really well but also learned a lot about craftsmanship, hard work, responsibility, and passion.</p>

              <p>Ottawa, Canada is where I now call home. I have lived in the nation's capital for over twenty years — a little over half my life. It's where I honed my craft, met my wife, and had three beautiful children. As you can imagine life is pretty hectic with three kids so I don't get a lot of free time these days but when I do, I enjoy running, cooking, playing my bass guitar, working on my house, or watching movies.</p>
            </div>

            <div className="background-image">
              <img className="background-image__graphic" src="/images/family-background.jpg" alt="Family"/>
            </div>
          </div>

          <div className="brand">
            <div className="grid">
              <img src="/images/logo.svg" className="brand__logo" alt="Filippo" />
            </div>
          </div>

          <div className="grid grid--career">
            <div className="career-section career-title content">
              <h2>Career</h2>
            </div>

          </div>
          <div className="grid grid--career">
            <div className="career-year career-section">
              <p>2000</p>
            </div>

            <div className="career-section career-highlight content">
              <p>I started my career as a graphic designer  working on print pieces for museums, non-profits, and small businesses.</p>
            </div>      

            <div className="career-section career-highlight content">
              <p>I started my career as a graphic designer  working on print pieces for museums, non-profits, and small businesses.</p>
            </div>
          </div>
          <div className="grid grid--career">
            <div className="career-year career-section">
              <p>2008</p>
            </div>
            <div className="career-section career-highlight content">
              <p>I started my career as a graphic designer  working on print pieces for museums, non-profits, and small businesses.</p>
            </div>
          </div>
          <div className="grid grid--career">
            
            <div className="career-year career-section">
              <p>2011</p>
            </div>
            <div className="career-section career-highlight content">
              <p>I started my career as a graphic designer  working on print pieces for museums, non-profits, and small businesses.</p>
            </div>
          </div>

          <div className="this-site">
            <div className="grid grid--site">
              <div className="this-site-content content">
                <h2 className="this-site-title error-message">“You can reach timelessness if you look for the essence of things and not the appearance. The appearance is transitory — the appearance is fashion, the appearance is trendiness — but the essence is timeless.” — Massimo Vignelli</h2>
              </div>
            </div>
          </div>
        
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

export default About;
