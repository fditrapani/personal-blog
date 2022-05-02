import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { config } from "../config";
import '../sass/routes/about.scss';
import Footer from '../components/footer'
import ProgressIndicator from '../components/progressindicator';

class About extends Component {
  constructor() {
      super();

      this.state = {
        isLoaded: false,
        isNotFound: false,
        aboutData: {},
      };
    }    

    componentDidMount() {
      this.getData();
    }

    getData = () => {
      const localData = localStorage.getItem( "About" );

      if ( localData ) {
        const dataObject = JSON.parse( localData );
        console.log(dataObject);
        
        if( dataObject  ) {
          this.setState({
            postData: dataObject,
            isLoaded: true,
          });
        }

        this.fetchData();
        return;
      }

      this.fetchData();    
    }

    fetchData = () => {
      //Fetch API request here
      fetch(
        'https://public-api.wordpress.com/rest/v1.1/sites/' + config.wordpress_url + '/posts/1910'
      ).then( response => {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);

              switch( response.status ) {
                case 404:
                  this.setState({ isNotFound: true });
                  break
                default:
                  console.log("Redirect to the broke page");
                  break
              }

              return;
            }

            // Examine the text in the response
            response.json().then( data => {
              this.setState({
                postData: data,
                isLoaded: true,
              });

              localStorage.setItem( "About", JSON.stringify( data ) );
            });
          }
        )
        .catch( err => {
          console.log('Fetch Error :-S', err);
        });
    }

    renderProgressIndicator = () => {
      if ( ! this.state.isLoaded ) {
        return <ProgressIndicator />
      }
    }


    renderContent = () => {
      if ( this.state.isLoaded ) {
        const data = this.state.postData;
        const description = data.excerpt.replace(/<\/?[^>]+(>|$)/g, "");
        const sharingImageURL = config.siteBanner;

        return (
          <div className="app-shell__content-wrapper">
            <div className="about__content">
              <div ref="LogoContainer" className="brand">
                <div className="grid">
                  <svg ref="Logo" className="brand__logo" viewBox="0 0 464 173"><title>Logo</title><g id="wordmark"><path d="M162.44,139.72a5.23,5.23,0,0,1-.4,1.15,31.36,31.36,0,0,1-6.35,10.46,30.35,30.35,0,0,1-10,7,34.22,34.22,0,0,1-26.07,0,30.35,30.35,0,0,1-10-7,29.49,29.49,0,0,1-6.34-10.46,9.24,9.24,0,0,1-.41-1.15H90.22c.51,1.72,1.14,3.83,1.88,5.66a40.43,40.43,0,0,0,23,22.48,50.61,50.61,0,0,0,35.11,0A40.09,40.09,0,0,0,164,159a40.82,40.82,0,0,0,9.15-13.61c.74-1.83,1.37-3.94,1.89-5.66Z"/><path d="M3.87,10.55H73V22.84H17.08V59.67h52V72h-52v50H3.87Z"/><path d="M88.56,48.35h12.29V122H88.56Z"/><path d="M126.36,3h12.29V122H126.36Z"/><path d="M164.27,48.35h12.29V122H164.27Z"/><path d="M381.56,85.17a39.59,39.59,0,0,1,3-15.72,37,37,0,0,1,8.18-12.18,36.12,36.12,0,0,1,12.41-8,44.7,44.7,0,0,1,31.45,0,35.65,35.65,0,0,1,12.41,8,37.35,37.35,0,0,1,8.17,12.18,39.94,39.94,0,0,1,3,15.72,39.67,39.67,0,0,1-3,15.73A37.07,37.07,0,0,1,449,113.07a36.27,36.27,0,0,1-12.41,8,44.7,44.7,0,0,1-31.45,0,35.51,35.51,0,0,1-12.41-8,37.49,37.49,0,0,1-8.18-12.17A41.15,41.15,0,0,1,381.56,85.17Zm13.27,0A31.71,31.71,0,0,0,396.65,96a24.86,24.86,0,0,0,13.56,14.46,28.56,28.56,0,0,0,21.61,0,25.91,25.91,0,0,0,8.29-5.83A25.54,25.54,0,0,0,445.37,96a32.84,32.84,0,0,0,0-21.62A24.85,24.85,0,0,0,431.82,59.9a28.56,28.56,0,0,0-21.61,0,24.86,24.86,0,0,0-13.56,14.46A30.4,30.4,0,0,0,394.83,85.17Z"/><path d="M272,69.45a37.38,37.38,0,0,0-8.18-12.18,35.51,35.51,0,0,0-12.41-8,44.7,44.7,0,0,0-31.45,0A36.56,36.56,0,0,0,208.7,56.2V48.35H196.4v121h12.3V114.16A36.42,36.42,0,0,0,220,121a44.7,44.7,0,0,0,31.45,0,36.12,36.12,0,0,0,12.41-8A37.09,37.09,0,0,0,272,100.9a39.67,39.67,0,0,0,3-15.73A39.94,39.94,0,0,0,272,69.45ZM260.16,96a25.54,25.54,0,0,1-5.26,8.63,25.91,25.91,0,0,1-8.29,5.83,28.56,28.56,0,0,1-21.61,0A24.8,24.8,0,0,1,211.44,96a32.84,32.84,0,0,1,0-21.62A24.81,24.81,0,0,1,225,59.9a28.56,28.56,0,0,1,21.61,0,24.83,24.83,0,0,1,13.55,14.46,32.84,32.84,0,0,1,0,21.62Z"/><path d="M366.69,69.45a37.38,37.38,0,0,0-8.18-12.18,35.61,35.61,0,0,0-12.4-8,44.7,44.7,0,0,0-31.45,0,36.58,36.58,0,0,0-11.27,6.88v-7.8H291.1v121h12.29V114.16A36.28,36.28,0,0,0,314.66,121a44.7,44.7,0,0,0,31.45,0,36.08,36.08,0,0,0,12.4-8,37.07,37.07,0,0,0,8.18-12.17,39.67,39.67,0,0,0,3-15.73A40,40,0,0,0,366.69,69.45ZM354.86,96a24.86,24.86,0,0,1-13.56,14.46,28.56,28.56,0,0,1-21.61,0A24.81,24.81,0,0,1,306.14,96a32.84,32.84,0,0,1,0-21.62,25.54,25.54,0,0,1,5.26-8.63,25.91,25.91,0,0,1,8.29-5.83,28.56,28.56,0,0,1,21.61,0,24.86,24.86,0,0,1,13.56,14.46,33,33,0,0,1,0,21.62Z"/></g><g id="eyes-open"><path d="M85.76,19.53A8.92,8.92,0,0,1,100.83,13l.2.2a8.77,8.77,0,0,1,2.57,6.29A9.15,9.15,0,0,1,88.16,26,9,9,0,0,1,85.76,19.53Z"/><path d="M161.41,19.53A8.94,8.94,0,0,1,176.5,13l.2.2a8.77,8.77,0,0,1,2.57,6.29A9.15,9.15,0,0,1,163.81,26,9.18,9.18,0,0,1,161.41,19.53Z"/></g><g id="eyes-blink"><path d="M88.33,19.24a8.83,8.83,0,0,1,12.5-.2l.2.2a9.12,9.12,0,0,1,2.1,3.39,10.18,10.18,0,0,0,.47-3.1,8.74,8.74,0,0,0-2.6-6.29A8.83,8.83,0,0,0,88.5,13l-.2.2a8.77,8.77,0,0,0-2.57,6.29,10.47,10.47,0,0,0,.46,3.14A8.84,8.84,0,0,1,88.33,19.24Z"/><path d="M164,19.24a8.83,8.83,0,0,1,12.5-.2l.2.2a9.12,9.12,0,0,1,2.1,3.39,10.18,10.18,0,0,0,.47-3.1A8.92,8.92,0,0,0,164.2,13l-.2.2a8.77,8.77,0,0,0-2.57,6.29,10.29,10.29,0,0,0,.47,3.11A9,9,0,0,1,164,19.24Z"/></g></svg>
                </div>
              </div>

              <div className="container container--about">
                <div className="content content-wrapper">
                  <div dangerouslySetInnerHTML={{ __html: data.content}} />
                </div>
              </div>
            </div>
                 
          </div>
        )
      }
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

          { this.renderProgressIndicator() }
          { this.renderContent() }
        </div>
      );
    }
}

export default About;