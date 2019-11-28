import React from 'react';
import PropTypes from 'prop-types';
import PostListing from "../postlisting";
import Button from "../button";
import { config } from "../../config"
import "./related.scss";

export default class Related extends React.Component {
  static propTypes = {
    preLoadedData: PropTypes.object,
    isCaseStudy: PropTypes.bool,
  }

  static defaultProps = {
    isFeatured: false,
    isCaseStudy: false,
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
    }
  }

  loadRelatedArticles() {
    const isCaseStudy = this.props.isCaseStudy;
    const storageType = isCaseStudy ? "Portfolio" : "Data";
    const localData = localStorage.getItem( storageType );
    const tags = Object.keys(this.props.preLoadedData.categories)[0];

    if ( localData ) {
      const dataObject = JSON.parse( localData );
      let dataArray = [];

      dataObject.find( x => {
        if ( Object.values( x.categories )[0].name === tags ) {
          if( x.ID  !== this.props.preLoadedData.ID ) {
            dataArray.push( 
              <div key={ x.ID } >
                <PostListing post={ x } embedded={ true } isCaseStudy={ isCaseStudy }/>
              </div>
            );
          }
        } 
        return null; 
      }); 

      shuffleArray( dataArray );

      const hideRelated = ( dataArray.length < 1 ) || false;

      this.setState({
        relatedPosts: dataArray.slice(0,3),
        hideRelated: hideRelated,
        relatedLoaded: true,
      });

      return;
    }
    
    fetch(
      `https://public-api.wordpress.com/rest/v1.1/sites/${ config.wordpress_url }/posts?category=${ tags }`
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
            <PostListing 
              post={ post } 
              embedded={ true } 
              isCaseStudy={ isCaseStudy }
              hideReadingTime={ true } />
          </div>
        )
      });

      const emptyKey = posts.indexOf(null);
      posts.splice( emptyKey, 1 );

      const hideRelated = ( posts.length < 1 ) || false;
      
      this.setState({
        relatedPosts: this.props.isCaseStudy ? posts : posts.slice(0,3),
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
          <Button to="/" buttonStyle="primary">View all posts</Button>
        </div>
      )
    }
    
    if ( this.state.relatedLoaded ) {
      return (
        <div className="related__container">
          <h2 className="related__title">
            { this.props.isCaseStudy ? 
              ( <React.Fragment>Read more case&nbsp;studies</React.Fragment> ) : 
              ( <React.Fragment>Other posts you might&nbsp;like</React.Fragment> )
            }            
          </h2>
          <div className="related__posts">
            { this.state.relatedPosts }
          </div>
          { this.props.isCaseStudy ?
           (
            <Button to="/" buttonStyle="primary">
              Learn more about me
            </Button>
           ) :
           (
              <Button to="/blog" buttonStyle="primary">
                View all posts
              </Button>
            )
          }
        </div>
      )
    }

    return (
      <div className="related__container">
        <h2 className="related__loading">Looking for related&nbsp;posts</h2>
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
