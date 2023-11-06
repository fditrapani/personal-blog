import React, { Component } from 'react';
import ProgressIndicator from '../components/progressindicator';
import PostListing from '../components/postlisting';
import { Helmet } from "react-helmet";
import { config } from "../config";
import { Link } from 'react-router-dom';
import Chevronicon from '../components/icons/chevronicon';
import Footer from '../components/footer'
import '../sass/routes/posts.scss';
import '../sass/routes/work.scss';

class Work extends Component {
  constructor() {
    super();

    this.state = {
      isLoaded: false,
      postData: {},
      feedUrl: 'https://public-api.wordpress.com/rest/v1.1/sites/' + config.wordpress_url + '/posts?category=Portfolio&number=' + config.postsPerPage,
      totalPages: 0,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    let storageName = "WorkData";
    const pageNumber = this.props.match.params.page;
    let url = this.state.feedUrl;

    if( pageNumber ){
      url += '&offset=' + ( ( this.props.match.params.page * config.postsPerPage ) - config.postsPerPage );
      storageName += " " + pageNumber;
    }

    const localData = localStorage.getItem( storageName );
    const totalPages = localStorage.getItem( "totalWorks");

    if ( localData ) {
      const jsonData = JSON.parse( localData )
      
      this.setState( { 
        postData: jsonData,
        isLoaded: true,
        totalPages: totalPages,
      } );

      this.fetchData( url ); 
      return;
    }    

    this.fetchData( url );    
  }

  fetchData = ( url  ) => {
    fetch( url ).then( response => {
          if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

          // Examine the text in the response
          response.json().then( data => {
            let storageName = "WorkData";
            const pageNumber = this.props.match.params.page;
            const totalPages = Math.ceil( data.found / config.postsPerPage );

            if( pageNumber ) {
              storageName += " " + pageNumber;
            }

            if( data.found === 0 ) {
              this.fetchData( this.state.feedUrl );
            }

            this.setState({
              postData: data.posts,
              isLoaded: true,
              totalPages: totalPages,
            });

            //Add to local storage
            localStorage.setItem( "totalWorks", totalPages);
            localStorage.setItem( storageName, JSON.stringify( data.posts ));
            return;
          });
        }
      )
      .catch( err => {
        console.log( 'Fetch Error :-S', err );
      });
  }

  renderProgressIndicator = () => {
    if ( ! this.state.isLoaded ) {
      return <ProgressIndicator />
    }
  }

  renderPagination = () => {
    const totalPages = this.state.totalPages; 
    const elements = [];
    const pageParam = parseInt( this.props.match.params.page );
    const pageNumber = ( pageParam && pageParam <= totalPages ) ? pageParam : 1;

    if( totalPages < 2 ) {
      return null;
    }

    for(var i = 1; i <= totalPages; i++) {      
      elements.push( 
        <li className="pagination__item" key={ i }>
          <Link 
            className={ i === pageNumber ? "pagination__link pagination__link--active" : "pagination__link" } 
            to={ "/page/" + i } >
              { i }
          </Link>
        </li>
      );
    }

    return (
      <ul className="pagination">
         { elements }
       </ul> 
    )
  }

  renderPorfolio = () => {
    return (
      <div>
        <h1 className='porfolio__title'>
          <span className='porfolio_title__selected'>Selected</span>
          <span className='porfolio_title__works'>works</span>
        </h1>
        <div className="portfolio">
          <div className="feature1 portfolio__cell portfolio__cell--image">
            <Link to={ "/casestudy/2953/b12-design-system" } className="portfolio__link">
              <img src="/images/work/b12-design-system.png" alt="" className="porfolio__image" />
              <span className="portfolio__name">
                Design system
                <Chevronicon />
              </span>
            </Link>
          </div>
          
          <div className="portfolio-lettering portfolio-lettering--web portfolio__cell">Web</div>
          
          <div className="feature2 portfolio__cell portfolio__cell--image">
            <Link to={ "/casestudy/2433/shopify-plus" } className="portfolio__link">
              <img src="/images/work/shopify-plus-redesign.png" alt="" className="porfolio__image" />
              <span className="portfolio__name">
                  Marketing <span>design</span>
                  <Chevronicon />
              </span>
            </Link>
          </div>
          
          <div className="feature3 portfolio__cell portfolio__cell--image">
            <Link to={ "/casestudy/2960/remx-brand-guide" } className="portfolio__link">
              <img src="/images/work/remx-brand-guide.png" alt="" className="porfolio__image" />
              <span className="portfolio__name">
                Brand guide
                <Chevronicon />
              </span>
            </Link>
          </div>
          
          <div className="portfolio-lettering portfolio-lettering--brand portfolio__cell">Brand</div>
          
          <div className="feature4 portfolio__cell portfolio__cell--image">
            <Link to={ "/casestudy/2438/shomi" } className="portfolio__link">
              <img src="/images/work/shomi-app.png" alt="" className="porfolio__image porfolio__image--desktop" loading="lazy"/>
              <img src="/images/work/shomi-app-mobile.png" alt="" className="porfolio__image porfolio__image--mobile" loading="lazy"/>
              <span className="portfolio__name">
                App design
                <Chevronicon />
              </span>
            </Link>
          </div>
          
          <div className="feature5 portfolio__cell portfolio__cell--image">
            <Link to={ "/casestudy/2475/wordpress-com-checkout" } className="portfolio__link">
              <img src="/images/work/checkout.jpeg" alt="" className="porfolio__image porfolio__image--desktop" loading="lazy" />
              <img src="/images/work/checkout-mobile.jpg" alt="" className="porfolio__image porfolio__image--mobile" loading="lazy" />
              <span className="portfolio__name">
                Product design
                <Chevronicon />
              </span>
            </Link>
          </div>
          
          <div className="portfolio-lettering portfolio-lettering--product portfolio__cell">Product</div>
          
          <div className="feature6 portfolio__cell portfolio__cell--image">
            <Link to={ "/casestudy/2356/shopify-partner-program" } className="portfolio__link">
              <img src="/images/work/shopify-partners.png" alt="" className="porfolio__image" loading="lazy" />
              <span className="portfolio__name">
                Org design
                <Chevronicon />
              </span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  renderContent = () => {
    if ( this.state.isLoaded ) {
      const data = this.state.postData;

      return (
        <div className="app-shell__content-wrapper">
          <Helmet>
              <title>Work | Filippo Di Trapani</title>
              <link rel="alternate" type="application/rss+xml" title="Subscribe to What's New" href={ config.rss_feed } />              
              <meta name="description"               content="The professional website of Fiippo Di Trapani. A product designer based out of Ottawa, Canada. Take a peak into his process as he share's his thoughts and experiences on design."/>
                  Canada. Take a peak into his process as he share's his thoughts and experiences on design."/>
              <meta property="og:url"                content={ config.url } />
              <meta property="og:type"               content="website" />
              <meta property="og:title"              content="Work | Filippo Di Trapani" />
              <meta property="og:description"        content="The professional website of Fiippo Di Trapani. A product designer based out of Ottawa, Canada. Take a peak into his process as he share's his thoughts and experiences on design."/>
              <meta property="og:image"              content={ config.siteBanner } />
              <meta name="twitter:image"             content={ config.siteBanner } />
              <meta name="twitter:creator"           content="@filippodt" />
              <meta name="twitter:card"              content="summary_large_image" />
              <meta name="twitter:title"             content="Work | Filippo Di Trapani" />
          </Helmet>
          

          { this.renderPorfolio() }   

          <div className="post-listing__wrapper case-studies">
               <h2 className="work-title--case-studies">Case studies</h2>
               <div className="grid grid--work">
               {
                 data.map( (post, index) => {
                   return (
                     <div className="tale" key={ post.ID }>
                        <PostListing 
                           post={ post }
                           isFeatured={ true }
                           isCaseStudy={ true }
                           hideReadingTime={ true } />
                      </div>
                   );
                 })
               }
               </div>

               { this.renderPagination() }       
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        { this.renderProgressIndicator() }
        { this.renderContent() }
      </div>
    );
  }
}

export default Work;
