import React, { Component } from 'react';
import ReadingTime from '../components/readingtime/';
import FeaturedImage from '../components/featuredimage';
import ProgressIndicator from '../components/progressindicator';
import { Redirect } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Related from "../components/related";
import { config } from "../config";
import '../sass/routes/post.scss';

class Post extends Component {
  constructor() {
    super();

    this.state = {
      isLoaded: false,
      isNotFound: false,
      postData: {},
    };
  }

  componentDidMount() {
    localStorage.setItem( 'visited-'+ window.location.pathname, true );
    this.getData();
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
    const dataSource = this.props.location.pathname.includes('casestudy')? "Portfolio" : "Data";
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
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);

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

  renderSubTitle = ( content, isArticle, description ) => {
    if ( isArticle ) {
      return (
        <ReadingTime content={ content } fullView={ true } />
      )
    }

    //Portfolio title
    return (
      <span>
        { description }
      </span>
    )
  }

  renderTitle = ( htmlTitle, content, isArticle, description, year ) => {
    if ( isArticle ) {
      return (
        <div className="post__title-wrapper">
          <h1 className="post__title" dangerouslySetInnerHTML={{ __html: htmlTitle }} />
          <h2 className="post__title--small">{ this.renderSubTitle( content, isArticle, description ) }</h2>
        </div>
      )
    }

    //Portfolio: duplicate h1 because it's better than a nonsense div or span
    return (
      <div className="post__title-wrapper post__title-wrapper--portfolio">        
        <h1 className="post__title--small" dangerouslySetInnerHTML={{ __html: htmlTitle + ": " + year }} />  
        <h2 className="post__title">{ this.renderSubTitle( content, isArticle, description.replace("&#8217;", "'") ) }</h2>
      </div>
    )
  }

  showFeaturedImage = ( url, title ) => {
    return (
      <div className="post__image">
        <FeaturedImage 
          imageUrl={ url }
          altText={ "Featured image for " + title } />
      </div>
    )
  }

  showRelatedContent = ( data, isCaseStudy ) => {
      return (
        <Related preLoadedData={ data } isCaseStudy={ isCaseStudy } />
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



  renderContent = () => {
    if ( this.state.isLoaded ) {
      const data = this.state.postData;
      const description = data.excerpt.replace(/<\/?[^>]+(>|$)/g, "");
      const imageURL = (data.post_thumbnail)? data.post_thumbnail.URL : config.siteBanner;
      const twitterImageURL = (imageURL)? imageURL.replace("https:", "http:"): config.siteBanner;
      const title = data.title;
      let htmlTitle = title;
      const lastIndex = htmlTitle.lastIndexOf(" ");
      const isArticle = (data.categories.Articles)? true : false;
      const isCaseStudy = (data.categories.Portfolio)? true : false;
      const year = new Date(data.date).getFullYear();
      htmlTitle = htmlTitle.substr(0, lastIndex) + '&nbsp;' + htmlTitle.substr(lastIndex + 1);
      const convertedTitle = this.encodeHTMLentities(title);
      
      return (
        <div className="app-shell__content-wrapper">
          <Helmet>
              <title>{ convertedTitle + " | Filippo Di Trapani" }</title>
              <link rel="alternate" type="application/rss+xml" title="Subscribe to What's New" href="https://filippodt.blog/feed/" />
              <meta name="description" content={ description }/>
              <meta property="og:url"                content={ config.url + "/post/" + data.ID + "/" + data.slug } />
              <meta property="og:type"               content="article" />
              <meta property="og:title"              content={ title } />
              <meta property="og:description"        content={ description } />
              <meta property="og:image"              content={ imageURL + "?w=1200" } />
              <meta name="twitter:image"             content={ twitterImageURL } />
              <meta name="twitter:creator"           content="@filippodt" />
          </Helmet>

          {  this.renderTitle( htmlTitle, data.content, isArticle, description, year ) }
            
          { this.showFeaturedImage( imageURL, title ) } 

          <div className="container">
            <div className="content content-wrapper">
               <div dangerouslySetInnerHTML={{ __html: data.content}} />

               { navigator.share && (
                  <button className="button--primary" onClick={ this.shareButtonClick }>
                    Share
                  </button>
                ) }

               <div className="divider">
                 { this.showRelatedContent( data, isCaseStudy ) }
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
        { this.renderProgressIndicator() }
        { this.renderContent() }
      </div>
    );
  }
}

export default Post;
