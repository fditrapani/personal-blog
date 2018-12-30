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
      const appShell = document.getElementsByClassName("app-shell__content")[0];
      appShell.addEventListener('scroll', this.handleScroll, true);
    }

    componentWillUnmount() {
      const appShell = document.getElementsByClassName("app-shell__content")[0];
      appShell.removeEventListener('scroll', this.handleScroll, true);
    }

    handleScroll = () => {
      const appShell = document.getElementsByClassName("app-shell__content")[0];
      const imageContainer = this.refs.BackgroundImageContainer;
      const image = this.refs.BackgroundImageGraphic;
      const logoContainer = this.refs.LogoContainer;
      const logo = this.refs.Logo;
      const thanksContainer = this.refs.ThanksContainer;
      const thanks = this.refs.Thanks;

      const logoPosition = (appShell.scrollTop - (logoContainer.offsetTop/1.5) )/3;
      const thanksPosition = (thanksContainer.offsetTop - appShell.scrollTop) - (appShell.clientHeight - thanksContainer.clientHeight + 50);

      if( imageContainer.offsetTop < ( appShell.scrollTop + imageContainer.clientHeight ) ) {
        image.setAttribute("style", "transform: translateY(-" + ( (appShell.scrollTop - (imageContainer.offsetTop/1.5) )/2.5 ) + "px)");
      }

      if( logoPosition < 0 ) {
        logo.setAttribute("style", "transform: translateY(" + logoPosition + "px)");
      }

      if( (thanksContainer.offsetTop - appShell.scrollTop) < appShell.clientHeight ) {
        thanks.setAttribute("style", "transform: translateY(-" + thanksPosition + "px)");
      }        
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
                <img className="avatar__image" src="/images/avatar.jpeg" alt="Filippo"/>
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

          <div className="background grid">
            <div className="background-copy content">
              <p>I was born and raised in Johannesburg, South Africa, by two loving parents. I wouldn't be where I am today if it wasn't for them and truly appreciate everything they have done, and continue to do for me today. Growing up in an Italian household, I not only ate really well but also learned a lot about craftsmanship, hard work, responsibility, and passion.</p>

              <p>Ottawa, Canada is where I now call home. I have lived in the nation's capital for over twenty years — a little over half my life. It's where I honed my craft, met my wife, and had three beautiful children. As you can imagine life is pretty hectic with three kids so I don't get a lot of free time these days but when I do, I enjoy running, cooking, playing my bass guitar, working on my house, or watching movies.</p>
            </div>

            <div ref="BackgroundImageContainer" onScroll={() => console.log('scroll')} className="background-image">
              <img ref="BackgroundImageGraphic" className="background-image__graphic" src="/images/family.jpg" alt="Family" />
            </div>
          </div>

          <div ref="LogoContainer" className="brand">
            <div className="grid">
              <img ref="Logo" src="/images/logo.svg" className="brand__logo" alt="Filippo" />
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

          <div className="inspiration">
            <div className="grid grid--inspiration">
              <div className="inpsiration__grid-item inspiration__title">
                  <h2>Inspiration</h2>
              </div>

              <div className="inpsiration__grid-item inspiration__bruce">
                  <img src="/images/bruce-lee.jpg" className="inspiration__image" alt="Howdy"/>
                  <p className="inspiration__label">Bruce Lee</p>
              </div>

              <div className="inpsiration__grid-item inspiration__bourdain">
                <img src="/images/bourdain.jpg" className="inspiration__image" alt="Howdy"/>
                <p className="inspiration__label">Anthony Bourdain</p>
              </div>              

              <div className="inspiration__quote">
                <blockquote className="inspiration__quote-text">
                  “The discipline of Design is one and can be applied to many different subjects, regardless of style. Design discipline is above and beyond any style. All style requires discipline in order to be expressed. Very often people think that Design is a particular style.”   <em>— Massimo Vignelli</em>
                </blockquote>
              </div>

              <div className="inpsiration__grid-item inspiration__badu">
                <img src="/images/erykah-badu.jpg" className="inspiration__image" alt="Howdy"/>
                <p className="inspiration__label">Erykah Badu</p>
              </div>              

              <div className="inpsiration__grid-item inspiration__quincy">
                <img src="/images/quincy.jpg" className="inspiration__image" alt="Howdy"/>
                <p className="inspiration__label">Quincy Jones</p>
              </div>
            </div>
          </div>
          <div ref="ThanksContainer" className="thanks">
            <div ref="Thanks">
              <h2 className="thanks__title">Thank you for visiting</h2>


              <a href="https://twitter.com/filippodt" target="_blank" rel="noopener noreferrer" className="social-icon social-icon--twitter">
                <svg viewBox="0 0 400 400"><title>Twitter</title><path d="M153.6,301.6c94.3,0,145.9-78.2,145.9-145.9,0-2.2,0-4.4-.1-6.6A104.47,104.47,0,0,0,325,122.5a103.93,103.93,0,0,1-29.5,8.1,51.59,51.59,0,0,0,22.6-28.4,102,102,0,0,1-32.6,12.4,51.29,51.29,0,0,0-88.7,35.1,56.68,56.68,0,0,0,1.3,11.7A145.61,145.61,0,0,1,92.4,107.8a51.48,51.48,0,0,0,15.9,68.5,51.87,51.87,0,0,1-23.2-6.4v.7a51.39,51.39,0,0,0,41.1,50.3,51.58,51.58,0,0,1-23.1.9A51.28,51.28,0,0,0,151,257.4a102.85,102.85,0,0,1-63.7,22,98.68,98.68,0,0,1-12.2-.7,145.86,145.86,0,0,0,78.5,22.9"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/filippoditrapani/" target="_blank" rel="noopener noreferrer" className="social-icon social-icon--linkedin">
                <svg viewBox="0 0 27.25 27.75"><title>LinkedIn</title><path d="M6.6,26.51H1.25V9.33H6.6ZM3.93,7A3.1,3.1,0,1,1,7,3.89,3.09,3.09,0,0,1,3.93,7ZM26.59,26.51H21.26V18.16c0-2,0-4.56-2.78-4.56s-3.2,2.17-3.2,4.41v8.5H10V9.33h5.11v2.35h.08A5.6,5.6,0,0,1,20.19,8.9c5.4,0,6.4,3.56,6.4,8.19Z"/></svg>
              </a>
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
