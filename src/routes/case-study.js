import React, { Component, useRef } from 'react';
import ProgressIndicator from '../components/progressindicator';
import { Redirect } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Related from "../components/related";
import NavigationIcon from '../components/icons/navigationIcon';
import { config } from "../config";
import '../sass/routes/casestudies.scss';

class Casestudy extends Component {
  constructor() {
    super();
    this.carouselRef = React.createRef();

    this.state = {
      isLoaded: false,
      isNotFound: false,
      postData: {},
      leftButtonOpacity: {
        opacity: 0.5,
      },
      rightButtonOpacity: {
        opacity: 1,
      },
    };
  }

  componentDidMount() {
    localStorage.setItem( 'visited-'+ window.location.pathname, true );
    this.getData();

    if (this.carouselRef.current) {
      this.carouselRef.current.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    // Remove scroll event listener when component unmounts
    if (this.carouselRef.current) {
      this.carouselRef.current.removeEventListener('scroll', this.handleScroll);
    }
  }

  componentWillReceiveProps( nextProps ) {
    if( nextProps.match.url !== this.props.match.url ){      
      localStorage.setItem( 'visited-'+ window.location.pathname, true );
      this.setState({
        isLoaded: false,
        isNotFound: false,
        postData: {},
      }, () => {
        this.getData();
      });
    }
  }

  getData = () => {
    const dataSource = "Portfolio";
    const localData = localStorage.getItem( dataSource );

    if ( localData ) {
      const dataObject = JSON.parse( localData );
      const postObject = dataObject.find( x => {
        if( Number(this.props.match.params.id)  === Number(x.ID) ) {
          return x;
        }

        return false;
      }); 
      
      
      if( postObject  ) {
        this.setState({
          postData: postObject,
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
      'https://public-api.wordpress.com/rest/v1.1/sites/' + config.wordpress_url + '/posts/' + this.props.match.params.id
    ).then( response => {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);

            switch( response.status ) {
              case 404:
                this.setState({ isNotFound: true, });
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

  encodeHTMLentities(str) {
      return str.replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec);
      });
    }

  renderSubTitle = ( description ) => {
    //Portfolio title
    return (
      <React.Fragment>
        { description }
      </React.Fragment>
    )
  }

  renderTitle = ( htmlTitle, description, year ) => {
    // Portfolio: duplicate h1 because it's better than a nonsense div or span
    return (
      <div className="post__title-wrapper post__title-wrapper--portfolio">        
        <h1 className="post__title--small" dangerouslySetInnerHTML={{ __html: htmlTitle + ": " + year }} />  
        <h2 className="post__title">{ this.renderSubTitle( description.replace("&#8217;", "'") ) }</h2>
      </div>
    )
  }

  showRelatedContent = ( data ) => {
      return (
        <Related preLoadedData={ data } isCaseStudy={ true } />
      )
  }

  shareButtonClick = () => {
      navigator.share({
          url: window.location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error)
      );
  }

   // Event handler for scrolling the carousel left
   handleCarouselNavigation = ( direction ) => {
    const totalSlides = this.carouselRef.current.scrollWidth / window.innerWidth;
    const currentSlide = direction === 1 ? Math.floor(this.carouselRef.current.scrollLeft / window.innerWidth) : Math.ceil(this.carouselRef.current.scrollLeft / window.innerWidth);
    const newSlide = (currentSlide + direction) * window.innerWidth;

    if (this.carouselRef.current) {
      this.carouselRef.current.scrollLeft = newSlide;
    }
  };

  // Event handler for scrolling the carousel right
  scrollRight = () => {
    if (this.carouselRef.current) {
      this.carouselRef.current.scrollLeft += window.innerWidth; // Adjust scroll distance as needed
    }
  };

  // Event handler for scroll event
  handleScroll = () => {
    if (this.carouselRef.current) {
      const isAtBeginning = this.carouselRef.current.scrollLeft === 0;
      const isAtEnd = this.carouselRef.current.scrollLeft + this.carouselRef.current.clientWidth >= this.carouselRef.current.scrollWidth;
  
      this.setState({
        leftButtonOpacity: { opacity: isAtBeginning ? 0.5 : 1 },
        rightButtonOpacity: { opacity: isAtEnd ? 0.5 : 1 },
      });
    }
  };

  renderContent = () => {
    if ( this.state.isLoaded ) {
      const data = this.state.postData;
      const description = data.excerpt.replace(/<\/?[^>]+(>|$)/g, "");
      const title = data.title;
      const htmlTitle = title;
      const year = new Date(data.date).getFullYear();
      const convertedTitle = this.encodeHTMLentities(title);

      //Wrangling content
      const content = data.content;
      let contentObject = document.createElement('div');
      contentObject.innerHTML = content;
      const caseStudyImages = contentObject.querySelector("#image-container").outerHTML;
      contentObject.querySelector("#image-container").remove();
      const strippedContent = contentObject.outerHTML;

      return (
        <React.Fragment>
          <div className="app-shell__content-wrapper">
            <Helmet>
                <title>{ convertedTitle + " | Filippo Di Trapani" }</title>
                <link rel="alternate" type="application/rss+xml" title="Subscribe to What's New" href={ config.rss_feed } />
                <meta name="description" content={ description }/>
                <meta property="og:url"                content={ config.url + "/post/" + data.ID + "/" + data.slug } />
                <meta property="og:type"               content="article" />
                <meta property="og:title"              content={ title } />
                <meta property="og:description"        content={ description } />
                <meta property="og:image"              content={ config.siteBanner } />
                <meta name="twitter:image"             content={ config.siteBanner } /> 
                <meta name="twitter:creator"           content="@filippodt" />
                <meta name="twitter:card"              content="summary_large_image" />
                <meta name="twitter:title"             content={ title } />
            </Helmet>

            <div className="container container--casestudy">
              <div className="casestudy_images_container">
                <div 
                  ref={ this.carouselRef } 
                  className="casestudy_images"
                  dangerouslySetInnerHTML={{ __html: caseStudyImages}} 
                  onScroll={ this.handleScroll }
                />

                <button 
                  className="casestudy_images_button casestudy_images_button--left" 
                  onClick={ () => { this.handleCarouselNavigation( -1 ) } }
                  style={ this.state.leftButtonOpacity }
                >
                  <NavigationIcon />
                </button>
                <button 
                  className="casestudy_images_button casestudy_images_button--right" 
                  onClick={ () => { this.handleCarouselNavigation( 1 ) } }
                  style={ this.state.rightButtonOpacity }
                >
                  <NavigationIcon />
                </button>
              </div>

              <div className="content content--casestudy">
                { this.renderTitle( htmlTitle, description, year ) }
                
                <div dangerouslySetInnerHTML={{ __html: strippedContent }} />

                { navigator.share && (
                    <button className="button--primary" onClick={ this.shareButtonClick }>
                      Share
                    </button>
                  ) }

                <div className="divider">
                  { this.showRelatedContent( data ) }
                </div>
              </div>
            </div>
          </div>


        </React.Fragment>
      )
    }
  }

  render() {
    if( this.state.isNotFound ) {
      return <Redirect to='/404'/>;
    }

    return (
      <div>
        { this.renderProgressIndicator() }
        { this.renderContent() }
      </div>
    );
  }
}

export default Casestudy;
