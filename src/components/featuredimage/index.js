import React from 'react';
import Logo from '../logo'
import "./featured-image.css";

export default class FeaturedImage extends React.Component {
	constructor() {
	  super();

	  this.state = {
	    imageClass: " featured-image--not-loaded",
	  };
	}

	loadImage = () => {
	  this.setState({
	    imageClass: " featured-image--loaded",
	  });
	}

	render() { 
		return (
		  <div className="container--image">
		      <div className="featured-image-wrapper">
		        <Logo logoClass="featured-image__loader" />
		        <img 
		          className={ "featured-image" + this.state.imageClass }
		          onLoad={ this.loadImage }
		          alt="Featured stuff"
		          src={ this.props.imageUrl } />
		      </div>
		    </div>
		);
	}
};
