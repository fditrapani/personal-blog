import React, { Component } from 'react';
import ProgressIndicator from '../components/progressindicator';
import PostListing from '../components/postlisting';
import { Helmet } from "react-helmet";
import { config } from "../config"
import './posts.css';


class Posts extends Component {
  constructor() {
    super();

    this.state = {
      isLoaded: false,
      postData: {},
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const localData = localStorage.getItem( "Data" );

    if ( localData ) {
      this.setState( { 
        postData: JSON.parse( localData ),
        isLoaded: true,
      } );
      return;
    }

    fetch(
      'https://public-api.wordpress.com/rest/v1.1/sites/' + config.wordpress_url + '/posts'
    ).then( response => {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

          // Examine the text in the response
          response.json().then( data => {
            this.setState({
              postData: data.posts,
              isLoaded: true,
            });

            //Add to local storage
            localStorage.setItem( "Data", JSON.stringify( data.posts ));
            return;
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
              <title>{ "Filippo Di Trapani" }</title>
              <meta name="description" content="A designer website by Filippo Di Trapani."/>
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
