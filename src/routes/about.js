import React, { Component } from 'react';
import FeaturedImage from '../components/featuredimage'
import ProgressIndicator from '../components/progressindicator'
import './post.css';

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
      localStorage.setItem( 'visited-'+ window.location.pathname, true );

      //Fetch API request here
      fetch(
        'https://public-api.wordpress.com/rest/v1.1/sites/filippodt.blog/posts/1780'
      ).then( response => {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
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
            <h1 className="post__title">{ data.title }</h1>
            
            <div className="post__image">
              <FeaturedImage 
                imageUrl={ data.featured_image }
                altText={ "Featured image for " + data.title } />
            </div>

            <div className="container">
              <div className="content">
                 <div dangerouslySetInnerHTML={{ __html: data.content}} />
               </div>
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

export default About;
