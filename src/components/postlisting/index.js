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
    embedded: PropTypes.bool,
    isCaseStudy: PropTypes.bool,
  }

  static defaultProps = {
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

  isVisited( url ) {
     if ( this.state.isVisited ) {
        return (
          <span className="post-listing__visited">
            Viewed
          </span> 
        )
     }
    return null;
  }

  render() { 
    const post = this.props.post;
    const image = post.post_thumbnail.URL;
    const id = post.ID;
    const title = post.title;
    const slug = post.slug;
    const directory = this.props.isCaseStudy ? 'casestudy' : 'post';
    const url = `/${ directory }/${ id }/${ slug }`;
    const content = post.content;

    return (
        <Link 
          to={ url } 
          className={ "post-listing" + ( (this.props.embedded) ? " post-listing--related" : "" ) }
        >

          <div className="post-listing__content" >
            <div className="post-listing__title" >
              <span dangerouslySetInnerHTML={{ __html: title }} />&nbsp;{ this.isVisited( url ) }
            </div>
            { ! this.props.hideReadingTime && (
             <ReadingTime content={ content } />
            ) }
          </div>
        </Link>
    );
  }
};
