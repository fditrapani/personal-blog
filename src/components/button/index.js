import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import "./button.css";

export default class Button extends React.Component {
  static propTypes = {
    buttonStyle: PropTypes.string,
  }

  static defaultProps = {
    buttonStyle: "base",
  };

  getStyle = () => {
  	switch( this.props.buttonStyle ) {
  		case "primary":
  			return "button--primary";
		default:
			return "button";
  	}
  }

  render() { 
    return (
        <Link 
          to={ this.props.to } 
          className={ this.getStyle() }
        >
          { this.props.children }
        </Link>
    );
  }
};