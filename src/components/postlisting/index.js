import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReadingTime from "../readingtime";
import "./post-listing.scss";
import FeaturedImage from "../featuredimage"
import CalendarIcon from "../calendaricon"

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
    isCurrentPost: PropTypes.bool,
  }

  static defaultProps = {
    isFeatured: false,
    embedded: false,
    isCaseStudy: false,
    isCurrentPost: false,
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
            <CalendarIcon />

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
          <path d="M12.6667 3.16667H3.33333C2.59695 3.16667 2 3.76363 2 4.50001V13.8333C2 14.5697 2.59695 15.1667 3.33333 15.1667H12.6667C13.403 15.1667 14 14.5697 14 13.8333V4.50001C14 3.76363 13.403 3.16667 12.6667 3.16667Z" stroke="#EAEAEA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.6667 1.83333V4.49999" stroke="#EAEAEA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.33337 1.83333V4.49999" stroke="#EAEAEA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 7.16667H14" stroke="#EAEAEA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
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
    const isCurrentPost = this.props.isCurrentPost;

    return (
        <Link 
          to={ url } 
          className={ "post-listing" + 
            ( (this.props.embedded) ? " post-listing--related" : "" ) +
            ( (isCurrentPost) ? " post-listing--current" : "" ) 
           }
        >
          { this.showImage ( image, this.props.isFeatured, title ) }

          <div className="post-listing__content" >
            <div className="post-listing__title">
              <span dangerouslySetInnerHTML={{ __html: title }} />
              
              { isCurrentPost && (
                <span className="post-listing__current-dot" />
              ) }
            </div>
            
            { (! this.props.hideReadingTime && ! this.props.embedded) && (
              <div className="post-listing__details">
                { this.renderDate(date) }
                <ReadingTime content={ content } />
                { this.renderVisited( url ) }
              </div>
            ) } 
          </div>
        </Link>
    );
  }
};
