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
      this.appShell = document.getElementsByClassName("app-shell__content")[0];
      this.imageContainer = this.refs.BackgroundImageContainer;
      this.image = this.refs.BackgroundImageGraphic;
      this.logoContainer = this.refs.LogoContainer;
      this.logo = this.refs.Logo;
      this.quote = this.refs.Quote;
      this.quoteContainer = this.refs.QuoteContainer;
      this.thanksContainer = this.refs.ThanksContainer;
      this.thanks = this.refs.Thanks;

      this.appShell.addEventListener('scroll', this.handleScroll, true);
    }

    componentWillUnmount() {
      this.appShell.removeEventListener('scroll', this.handleScroll, true);
    }

    handleScroll = () => {
      const appShellScrollTop = this.appShell.scrollTop;
      const appShellClientHeight = this.appShell.clientHeight;
      const imageContainerOffset = this.imageContainer.offsetTop;
      const thanksContainerOffset = this.thanksContainer.offsetTop;
      const quoteContainerOffset = this.quoteContainer.offsetTop;
      const logoPosition = (appShellScrollTop - (this.logoContainer.offsetTop/1.5) )/3;
      const thanksPosition = (thanksContainerOffset - appShellScrollTop) - (appShellClientHeight - this.thanksContainer.clientHeight + 50);
      const quotePosition = (quoteContainerOffset - appShellScrollTop)/2 - (appShellClientHeight - this.quoteContainer.clientHeight + 50)/2;


      if( imageContainerOffset < ( appShellScrollTop + this.imageContainer.clientHeight ) ) {
        this.image.setAttribute("style", "transform: translateY(-" + ( (appShellScrollTop - (imageContainerOffset/1.5) )/2.5 ) + "px)");
      }

      if( logoPosition < 0 ) {
        this.logo.setAttribute("style", "transform: translateY(" + logoPosition + "px)");
      }

      if( (quoteContainerOffset - appShellScrollTop) < ( appShellClientHeight + 100 ) && quotePosition > 0 ) {
        this.quote.setAttribute("style", "transform: translateY(" + quotePosition + "px); opacity:" + ( (appShellScrollTop + this.quoteContainer.clientHeight/1.5 )/quoteContainerOffset ) + ";");
      }        

      if( (thanksContainerOffset - appShellScrollTop) < ( appShellClientHeight + 100 ) ) {
        this.thanks.setAttribute("style", "transform: translateY(-" + thanksPosition + "px)");
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

          <div className="grid">
            <div className="background-copy content">
              <p>I was born and raised in Johannesburg, South Africa, by two loving parents. I wouldn't be where I am today if it wasn't for them and truly appreciate everything they have done, and continue to do for me today. Growing up in an Italian household, I not only ate really well but also learned a lot about craftsmanship, hard work, responsibility, and passion.</p>

              <p>Ottawa, Canada is where I now call home. I have lived in the nation's capital for over twenty years — a little over half my life. It's where I honed my craft, met my wife, and had three beautiful children. As you can imagine life is pretty hectic with three kids so I don't get a lot of free time these days but when I do, I enjoy running, cooking, playing my bass guitar, working on my house, or watching movies.</p>
            </div>

            <div ref="BackgroundImageContainer" onScroll={() => console.log('scroll')} className="background-image">
              <div ref="BackgroundImageGraphic" className="background-image__graphic">
                <img className="background-image__graphics" src="/images/image-1.jpg" alt="Family" />
                <img className="background-image__graphics" src="/images/image-2.jpg" alt="Family" />
                <img className="background-image__graphics" src="/images/image-3.jpg" alt="Family" />
              </div>
            </div>
          </div>

          <div ref="LogoContainer" className="brand">
            <div className="grid">
              <svg ref="Logo" className="brand__logo" viewBox="0 0 464 173"><title>Logo</title><g id="wordmark"><path d="M162.44,139.72a5.23,5.23,0,0,1-.4,1.15,31.36,31.36,0,0,1-6.35,10.46,30.35,30.35,0,0,1-10,7,34.22,34.22,0,0,1-26.07,0,30.35,30.35,0,0,1-10-7,29.49,29.49,0,0,1-6.34-10.46,9.24,9.24,0,0,1-.41-1.15H90.22c.51,1.72,1.14,3.83,1.88,5.66a40.43,40.43,0,0,0,23,22.48,50.61,50.61,0,0,0,35.11,0A40.09,40.09,0,0,0,164,159a40.82,40.82,0,0,0,9.15-13.61c.74-1.83,1.37-3.94,1.89-5.66Z"/><path d="M3.87,10.55H73V22.84H17.08V59.67h52V72h-52v50H3.87Z"/><path d="M88.56,48.35h12.29V122H88.56Z"/><path d="M126.36,3h12.29V122H126.36Z"/><path d="M164.27,48.35h12.29V122H164.27Z"/><path d="M381.56,85.17a39.59,39.59,0,0,1,3-15.72,37,37,0,0,1,8.18-12.18,36.12,36.12,0,0,1,12.41-8,44.7,44.7,0,0,1,31.45,0,35.65,35.65,0,0,1,12.41,8,37.35,37.35,0,0,1,8.17,12.18,39.94,39.94,0,0,1,3,15.72,39.67,39.67,0,0,1-3,15.73A37.07,37.07,0,0,1,449,113.07a36.27,36.27,0,0,1-12.41,8,44.7,44.7,0,0,1-31.45,0,35.51,35.51,0,0,1-12.41-8,37.49,37.49,0,0,1-8.18-12.17A41.15,41.15,0,0,1,381.56,85.17Zm13.27,0A31.71,31.71,0,0,0,396.65,96a24.86,24.86,0,0,0,13.56,14.46,28.56,28.56,0,0,0,21.61,0,25.91,25.91,0,0,0,8.29-5.83A25.54,25.54,0,0,0,445.37,96a32.84,32.84,0,0,0,0-21.62A24.85,24.85,0,0,0,431.82,59.9a28.56,28.56,0,0,0-21.61,0,24.86,24.86,0,0,0-13.56,14.46A30.4,30.4,0,0,0,394.83,85.17Z"/><path d="M272,69.45a37.38,37.38,0,0,0-8.18-12.18,35.51,35.51,0,0,0-12.41-8,44.7,44.7,0,0,0-31.45,0A36.56,36.56,0,0,0,208.7,56.2V48.35H196.4v121h12.3V114.16A36.42,36.42,0,0,0,220,121a44.7,44.7,0,0,0,31.45,0,36.12,36.12,0,0,0,12.41-8A37.09,37.09,0,0,0,272,100.9a39.67,39.67,0,0,0,3-15.73A39.94,39.94,0,0,0,272,69.45ZM260.16,96a25.54,25.54,0,0,1-5.26,8.63,25.91,25.91,0,0,1-8.29,5.83,28.56,28.56,0,0,1-21.61,0A24.8,24.8,0,0,1,211.44,96a32.84,32.84,0,0,1,0-21.62A24.81,24.81,0,0,1,225,59.9a28.56,28.56,0,0,1,21.61,0,24.83,24.83,0,0,1,13.55,14.46,32.84,32.84,0,0,1,0,21.62Z"/><path d="M366.69,69.45a37.38,37.38,0,0,0-8.18-12.18,35.61,35.61,0,0,0-12.4-8,44.7,44.7,0,0,0-31.45,0,36.58,36.58,0,0,0-11.27,6.88v-7.8H291.1v121h12.29V114.16A36.28,36.28,0,0,0,314.66,121a44.7,44.7,0,0,0,31.45,0,36.08,36.08,0,0,0,12.4-8,37.07,37.07,0,0,0,8.18-12.17,39.67,39.67,0,0,0,3-15.73A40,40,0,0,0,366.69,69.45ZM354.86,96a24.86,24.86,0,0,1-13.56,14.46,28.56,28.56,0,0,1-21.61,0A24.81,24.81,0,0,1,306.14,96a32.84,32.84,0,0,1,0-21.62,25.54,25.54,0,0,1,5.26-8.63,25.91,25.91,0,0,1,8.29-5.83,28.56,28.56,0,0,1,21.61,0,24.86,24.86,0,0,1,13.56,14.46,33,33,0,0,1,0,21.62Z"/></g><g id="eyes-open"><path d="M85.76,19.53A8.92,8.92,0,0,1,100.83,13l.2.2a8.77,8.77,0,0,1,2.57,6.29A9.15,9.15,0,0,1,88.16,26,9,9,0,0,1,85.76,19.53Z"/><path d="M161.41,19.53A8.94,8.94,0,0,1,176.5,13l.2.2a8.77,8.77,0,0,1,2.57,6.29A9.15,9.15,0,0,1,163.81,26,9.18,9.18,0,0,1,161.41,19.53Z"/></g><g id="eyes-blink"><path d="M88.33,19.24a8.83,8.83,0,0,1,12.5-.2l.2.2a9.12,9.12,0,0,1,2.1,3.39,10.18,10.18,0,0,0,.47-3.1,8.74,8.74,0,0,0-2.6-6.29A8.83,8.83,0,0,0,88.5,13l-.2.2a8.77,8.77,0,0,0-2.57,6.29,10.47,10.47,0,0,0,.46,3.14A8.84,8.84,0,0,1,88.33,19.24Z"/><path d="M164,19.24a8.83,8.83,0,0,1,12.5-.2l.2.2a9.12,9.12,0,0,1,2.1,3.39,10.18,10.18,0,0,0,.47-3.1A8.92,8.92,0,0,0,164.2,13l-.2.2a8.77,8.77,0,0,0-2.57,6.29,10.29,10.29,0,0,0,.47,3.11A9,9,0,0,1,164,19.24Z"/></g></svg>
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

              <div ref="QuoteContainer" className="inspiration__quote">
                <blockquote ref="Quote" className="inspiration__quote-text">
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
