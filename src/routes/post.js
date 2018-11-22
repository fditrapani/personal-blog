import React, { Component } from 'react';
import ReadingTime from '../components/readingtime/';
import FeaturedImage from '../components/featuredimage'
import ProgressIndicator from '../components/progressindicator'
import { Redirect } from 'react-router-dom'
import { Helmet } from "react-helmet"
import Related from "../components/related"
import { config } from "../config"
import './post.css'

class Post extends Component {
  constructor() {
    super();

    this.state = {
      isLoaded: false,
      isNotFound: false,
      unload: false,
      postData: {},
    };
  }

  componentDidMount() {
    localStorage.setItem( 'visited-'+ window.location.pathname, true );
    this.getData();
  }

  componentWillReceiveProps( nextProps ) {
    if( nextProps.match.url !== this.props.match.url ){

      this.setState( { unload: true });
      // Animate content out before changing shit...
      
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
    const localData = localStorage.getItem( "Data" );

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
          unload: false,
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
              unload: false,
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

  renderContent = () => {
    if ( this.state.isLoaded ) {
      const data = this.state.postData;
      const description = data.excerpt.replace(/<\/?[^>]+(>|$)/g, "");
      const imageURL = data.post_thumbnail.URL;
      const twitterImageURL = imageURL.replace("https:", "http:");;
      const title = data.title;
      let htmlTitle = title;
      const lastIndex = htmlTitle.lastIndexOf(" ");
      htmlTitle = htmlTitle.substr(0, lastIndex) + '&nbsp;' + htmlTitle.substr(lastIndex + 1);
      
      return (
        <div className={ "post__content-wrapper" + ( this.state.unload ? " post__content-wrapper--unload" : "" ) }>
          <Helmet>
              <title>{ title + " | Filippo Di Trapani" }</title>
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

          <h1 className="post__title">
            <span dangerouslySetInnerHTML={{ __html: htmlTitle }} />
            <ReadingTime content={ data.content } fullView={ true } />
          </h1>
          
          <div className="post__image">
            <FeaturedImage 
              imageUrl={ imageURL }
              altText={ "Featured image for " + title } />
          </div>

          <div className="container">
            <div className="content">
               <div dangerouslySetInnerHTML={{ __html: data.content}} />


               <div className="divider">
                 <Related preLoadedData={ data } />
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
