import React from 'react';
import PropTypes from 'prop-types';
import PostListing from "../postlisting";
import Button from "../button";
import "./related.css";

export default class Related extends React.Component {
  static propTypes = {
    preLoadedData: PropTypes.object,
  }

  static defaultProps = {
    isFeatured: false,
  };

  constructor() {
    super();

    this.state = {
      relatedPosts: [],
      hideRelated: false,
      relatedLoaded: false,
    };
  }

  componentWillMount() {
    this.loadRelatedArticles();
  }

  componentWillReceiveProps( nextProps ) {
    if( nextProps.preLoadedData.ID !== this.props.preLoadedData.ID ){
      this.setState({
        relatedPosts: [],
        relatedLoaded: false,
      });

      this.loadRelatedArticles();
    }
  }

  loadRelatedArticles() {
    const tags = Object.keys(this.props.preLoadedData.categories)[0];
    
    fetch(
      `https://public-api.wordpress.com/rest/v1.1/sites/fditrapani.wordpress.com/posts?category=${ tags }`
    ).then( response => {
      return response.json();
    }).then( data => {
      const dataArray = data.posts;
      shuffleArray( dataArray );

      let posts = dataArray.map( ( post ) => {
        if ( this.props.preLoadedData.ID === post.ID ) {
          return null;
        }

        return (
          <div key={ post.ID } >
            <PostListing post={ post } embedded={ true }/>
          </div>
        )
      });

      const emptyKey = posts.indexOf(null);
      posts.splice( emptyKey, 1 );

      const hideRelated = ( posts.length < 1 ) || false;
      
      this.setState({
        relatedPosts: posts.slice(0,3),
        hideRelated: hideRelated,
        relatedLoaded: true,
      });
    });
  }

  render() { 
  	if ( this.state.hideRelated ) {
      return (
        <div className="related__container">
          <h2 className="related__noposts">Keep reading</h2>
          <Button to="/" buttonStyle="primary">View all articles</Button>
        </div>
      )
    }
    
    if ( this.state.relatedLoaded ) {
      return (
        <div className="related__container">
          <h2>Other articles you might&nbsp;like</h2>
          <div className="related__posts">
            { this.state.relatedPosts }
          </div>
          <Button to="/" buttonStyle="primary">
            View all articles
          </Button>
        </div>
      )
    }

    return (
      <div className="related__container">
        <h2 className="related__loading">Looking for related&nbsp;articles</h2>
      </div>
    );
  }
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}