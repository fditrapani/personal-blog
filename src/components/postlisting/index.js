import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReadingTime from "../readingtime";
import "./post-listing.scss";
import FeaturedImage from "../featuredimage"

export default class PostListing extends React.Component {
  constructor() {
    super();

    this.state = {
      isVisited: false,
    };
  }

  static propTypes = {
    post: PropTypes.object,
    isFeatured: PropTypes.bool, 
    embedded: PropTypes.bool,
    isCaseStudy: PropTypes.bool,
  }

  static defaultProps = {
    isFeatured: false,
    embedded: false,
    isCaseStudy: false,
  };

  componentDidMount() {
    const post = this.props.post;
    const directory = this.props.isCaseStudy ? 'casestudy' : 'post';
    const url = `/${ directory }/${ post.ID }/${ post.slug }`;

    if ( localStorage.getItem('visited-' + url ) ) {
      this.setState({ isVisited: true, });
    }
  }

  renderVisited( url ) {
     if ( this.state.isVisited ) {
        return (
          <span className="post-listing__visited post-listing__icon">
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 6.5L6.875 10.5L5 8.68182" stroke="#EAEAEA" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
              <rect x="0.666667" y="1.16667" width="14.6667" height="14.6667" rx="7.33333" stroke="#EAEAEA" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>


            Viewed
          </span> 
        )
     }
    return null;
  }

  renderDate( date ) {
    return(
      <span className="post-listing__date post-listing__icon">
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.6667 3.16667H3.33333C2.59695 3.16667 2 3.76363 2 4.50001V13.8333C2 14.5697 2.59695 15.1667 3.33333 15.1667H12.6667C13.403 15.1667 14 14.5697 14 13.8333V4.50001C14 3.76363 13.403 3.16667 12.6667 3.16667Z" stroke="#EAEAEA" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10.6667 1.83333V4.49999" stroke="#EAEAEA" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5.33337 1.83333V4.49999" stroke="#EAEAEA" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 7.16667H14" stroke="#EAEAEA" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        { date }
      </span>
    )
  }

  showImage ( image, bool, text ) {
    if ( bool ) {
      return (
        <div className="post-listing__image-wrapper">
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
    const image = post.post_thumbnail ? post.post_thumbnail.URL : null;
    const id = post.ID;
    const title = post.title;
    const slug = post.slug;
    const directory = this.props.isCaseStudy ? 'casestudy' : 'post';
    const url = `/${ directory }/${ id }/${ slug }`;
    const content = post.content;
    const date = new Date(post.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <Link 
          to={ url } 
          className={ "post-listing" + ( (this.props.embedded) ? " post-listing--related" : "" ) }
        >
          { this.showImage ( image, this.props.isFeatured, title ) }

          <div className="post-listing__content" >
            { ! this.props.hideReadingTime && (
              <div className="post-listing__details">
                { this.renderDate(date) }
                <ReadingTime content={ content } />
                { this.renderVisited( url ) }
              </div>
            ) } 

            <div className="post-listing__title" dangerouslySetInnerHTML={{ __html: title }} />
            
          </div>
        </Link>
    );
  }
};
