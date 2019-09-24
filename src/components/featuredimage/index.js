import React from 'react';
import "./featured-image.scss";

export default class FeaturedImage extends React.Component {
	constructor() {
	  super();

	  this.state = {
	    imageClass: " featured-image--not-loaded",
	    wrapperClass: " featured-image-wrapper--not-loaded",
	  };
	}

	loadImage = () => {
	  this.setState({
	    imageClass: " featured-image--loaded",
	    wrapperClass: " featured-image-wrapper--loaded",
	  });
	}

	render() { 
		const image = this.props.imageUrl;
		const altText = this.props.altText ? this.props.altText : null;

		return (
	      <div className={ "featured-image-wrapper" + this.state.wrapperClass }>
	        <img 
	          className={ "featured-image" + this.state.imageClass }
	          onLoad={ this.loadImage }
	          alt={ altText }
	          src={ image } 
	          srcSet={ `${ image + "?w=800" } 800w, ${ image + "?w=1600" } 1600w, ${ image + "?w=3200" } 3200w` } />
	      </div>
		);
	}
};
