import React, { Component } from 'react';
import ReadingTime from '../components/readingtime/';
import FeaturedImage from '../components/featuredimage'
import Button from '../components/button'
import ProgressIndicator from '../components/progressindicator'
import { Redirect } from 'react-router-dom'
import { Helmet } from "react-helmet"
import './post.css'

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

    //Fetch API request here
    fetch(
      'https://public-api.wordpress.com/rest/v1.1/sites/filippodt.blog/posts/' + this.props.match.params.id
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

  renderContent = () => {
    if ( this.state.isLoaded ) {
      const data = this.state.postData;

      return (
        <div className="app-shell__content-wrapper">
          <Helmet>
              <title>{ data.title + " | Filippo Di Trapani" }</title>
              <meta name="description" content={ data.excerpt.replace(/<\/?[^>]+(>|$)/g, "") }/>
          </Helmet>

          <h1 className="post__title">{ data.title }<ReadingTime content={ data.content } fullView={ true } /></h1>
          
          <div className="post__image">
            <FeaturedImage 
              imageUrl={ data.featured_image }
              altText={ "Featured image for " + data.title } />
          </div>

          <div className="container">
            <div className="content">
               <div dangerouslySetInnerHTML={{ __html: data.content}} />


               <div className="divider">
                 <Button
                   to="/"
                   buttonStyle="primary"
                 >
                   View all posts
                 </Button>
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
