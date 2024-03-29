import React, { Component } from 'react';
import FeaturedImage from '../components/featuredimage';
import ProgressIndicator from '../components/progressindicator';
import CalendarIcon from '../components/icons/calendaricon';
import ReadingTime from "../components/readingtime";
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
    const dataSource = "Data";
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

  renderSubTitle = ( content ) => {
    return (
      <ReadingTime content={ content } fullView={ true } />
    )
  }

  renderTitle = ( htmlTitle, content, date, imageURL ) => {
    return (
      <div className={ imageURL ? 'post__title-wrapper' : 'post__title-wrapper-without-image'   }>
        <h1 className="post__title" dangerouslySetInnerHTML={{ __html: htmlTitle }} />
        <div className="post__meta">
          <span className="post__meta-content">
            <CalendarIcon /> { date }
          </span>
          <span className="post__meta-content">
            <ReadingTime content={ content } />
          </span>
        </div>
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

  showRelatedContent = ( data ) => {
      return (
        <Related preLoadedData={ data } isCaseStudy={ false } />
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
      const imageURL = (data.post_thumbnail)? data.post_thumbnail.URL : false;
      const title = data.title;
      const htmlTitle = title;
      const date = new Date(data.date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
      const convertedTitle = this.encodeHTMLentities(title);
      
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

            <div className="container">
              <div className="content content-wrapper">
                 { imageURL && this.showFeaturedImage( imageURL, title ) } 
                 { this.renderTitle( htmlTitle, data.content, date, imageURL ) }
                 
                 <div dangerouslySetInnerHTML={{ __html: data.content}} />

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

export default Post;
