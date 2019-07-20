import React, { Component } from 'react';
import ProgressIndicator from '../components/progressindicator';
import PostListing from '../components/postlisting';
import { Helmet } from "react-helmet";
import { config } from "../config"
import { Link } from 'react-router-dom';
import '../sass/routes/posts.scss';


class Posts extends Component {
  constructor() {
    super();

    this.state = {
      isLoaded: false,
      postData: {},
      feedUrl: 'https://public-api.wordpress.com/rest/v1.1/sites/' + config.wordpress_url + '/posts?category=Articles&number=' + config.postsPerPage,
      totalPages: 0,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    let storageName = "Data";
    const pageNumber = this.props.match.params.page;
    let url = this.state.feedUrl;

    if( pageNumber ){
      url += '&offset=' + ( ( this.props.match.params.page * config.postsPerPage ) - config.postsPerPage );
      storageName += " " + pageNumber;
    }

    const localData = localStorage.getItem( storageName );
    const totalPages = localStorage.getItem( "totalPages");

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
            let storageName = "Data";
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
            localStorage.setItem( "totalPages", totalPages);
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

  renderContent = () => {
    if ( this.state.isLoaded ) {
      const data = this.state.postData;

      return (
        <div className="app-shell__content-wrapper">
          <Helmet>
              <title>Flow: An online journal by Filippo Di Trapani</title>
              <link rel="alternate" type="application/rss+xml" title="Subscribe to What's New" href="https://filippodt.blog/feed/" />              
              <meta name="description"               content="Personal website for designer based in Ottawa, 
                  Canada. Take a peak into his process as he share's his thoughts and experiences on design."/>
              <meta property="og:url"                content={ config.url } />
              <meta property="og:type"               content="website" />
              <meta property="og:title"              content="Flow: An online journal by Filippo Di Trapani" />
              <meta property="og:description"        content="Personal website for designer based in Ottawa, 
                  Canada. Take a peak into his process as he share's his thoughts and experiences on design." />
              <meta property="og:image"             content={ config.siteBanner } />
              <meta name="twitter:image"             content={ config.siteBanner } />
              <meta name="twitter:creator"           content="@filippodt" />
          </Helmet>
          <div className="post-listing__wrapper">
               {
                 data.map( (post, index) => {
                   return (
                     <div key={ post.ID }>
                       <PostListing 
                          post={ post }
                          isFeatured={ index === 0 ? true : false} />
                     </div>
                   );
                 })
               }

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

export default Posts;
