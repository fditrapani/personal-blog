import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReadingTime from "../readingtime";
import "./post-listing.scss";
import FeaturedImage from "../featuredimage"
import CalendarIcon from "../calendaricon"
import CheckIcon from "../checkicon"

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
            <CheckIcon />

            Viewed
          </span> 
        )
     }
    return null;
  }

  renderDate( date ) {
    return(
      <span className="post-listing__date post-listing__icon">
        <CalendarIcon />

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
    const date = new Date(post.date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
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
