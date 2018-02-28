import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from "lodash";
import ReadingTime from "../reading-time";
import * as styles from "./post-link.scss";


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
          <span className={ styles.visited }>
            Viewed
          </span> 
        )
     }
    return null;
  }

  showImage ( image, bool ) {
    if ( bool ) {
      return (
        <div className={ styles.imageWrapper }>
          <img 
            className={ styles.image }
            aria-hidden="true"
            src={ image } 
            srcSet={ `${ image + "?w=800" } 800w, ${ image + "?w=1600" } 1600w, ${ image + "?w=3200" } 3200w` }
          />
        </div>
      );
    }

    return null;
  }

  render() { 
    const post = this.props.post;
    const imageRaw = _.get(post, "featured_image", 0);
    const image =  imageRaw.substring( 0, imageRaw.indexOf("?") );
    const id = _.get(post, "ID", 0);
    const title = _.get(post, "title", 0);
    const slug = _.get(post, "slug", 0);
    const url = `/articles/${id}/${slug}`;
    const content = _.get(post, "content", 0);

    return (
        <Link 
          to={ url } 
          className={ styles.article + ( (this.props.embedded) ? " " + styles.related : "" ) }
        >

          { this.showImage ( image, this.props.isFeatured ) }

          <div className={ styles.content } >
            <div className={ styles.title } >
              { title }&nbsp;{ this.isVisited( url ) }
            </div>

             <ReadingTime content={ content } />
          </div>
        </Link>
    );
  }
};
