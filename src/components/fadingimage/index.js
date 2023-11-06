import React, { Component } from 'react';
import "./style.scss";

class FadingImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
  }

  handleImageLoad = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { src, alt, addClass } = this.props;
    const { loaded } = this.state;

    return (
        <img src={src} alt={alt} onLoad={this.handleImageLoad} className={ `fading-image ${loaded ? 'loaded' : ''} ${ addClass ? addClass : ''} `} loading="lazy" />
    );
  }
}

export default FadingImage;