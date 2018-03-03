import React, { Component } from 'react';
import ProgressIndicator from '../components/progressindicator';
import { Redirect } from 'react-router-dom';
import PostListing from '../components/postlisting';
import './posts.css';

class Posts extends Component {
  constructor() {
    super();

    this.state = {
      isLoaded: false,
      isNotFound: false,
      postData: {},
    };
  }

  componentDidMount() {
    //Fetch API request here
    fetch(
      'https://public-api.wordpress.com/rest/v1.1/sites/fditrapani.wordpress.com/posts'
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
            console.log(data);

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
      const data = this.state.postData.posts;
      console.log( data );

      return (
        <div className="app-shell__content-wrapper">
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

export default Posts;
