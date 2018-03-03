import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReadingTime from "../readingtime";
import "./post-listing.css";
import FeaturedImage from "../featuredimage"

export default class PostListing extends React.Component {
  static propTypes = {
    post: PropTypes.object,
    isFeatured: PropTypes.bool, 
    embedded: PropTypes.bool,
  }

  static defaultProps = {
    isFeatured: false,
    embedded: false,
  };

  isVisited( url ) {
     if ( localStorage.getItem('visited-' + url ) ) {
        return (
          <span className="post-listing__visited">
            Viewed
          </span> 
        )
     }
    return null;
  }

  showImage ( image, bool, text ) {
    if ( bool ) {
      return (
        <div className="post-listing__imageWrapper">
          <FeaturedImage 
            imageUrl={ image } 
            altText={ text } />
        </div>
      );
    }

    return null;
  }

  render() { 
    const post = this.props.post;
    const imageRaw = post.featured_image;
    const image =  imageRaw.substring( 0, imageRaw.indexOf("?") );
    const id = post.ID;
    const title = post.title;
    const slug = post.slug;
    const url = `/post/${id}/${slug}`;
    const content = post.content;

    return (
        <Link 
          to={ url } 
          className={ "post-listing" + ( (this.props.embedded) ? " post-listing--related" : "" ) }
        >

          { this.showImage ( image, this.props.isFeatured, title ) }

          <div className="post-listing__content" >
            <div className="post-listing__title" >
              { title }&nbsp;{ this.isVisited( url ) }
            </div>

             <ReadingTime content={ content } />
          </div>
        </Link>
    );
  }
};
