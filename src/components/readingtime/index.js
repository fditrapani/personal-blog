import React from 'react';
import PropTypes from 'prop-types';

export default class ReadingTime extends React.Component {
  static propTypes = {
    content: PropTypes.string,
    fullView: PropTypes.bool,
  }

  static defaultProps = {
    fullView: false,
  };

  render() { 
    const durationTime = Math.round( this.props.content.replace(/(<([^>]+)>)/ig,"").split(' ').length / 200 );

    return (
      <span className={ this.props.fullView ? null : "post-listing__reading-time post-listing__icon"}>

        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.99992 15.1667C11.6818 15.1667 14.6666 12.1819 14.6666 8.5C14.6666 4.8181 11.6818 1.83333 7.99992 1.83333C4.31802 1.83333 1.33325 4.8181 1.33325 8.5C1.33325 12.1819 4.31802 15.1667 7.99992 15.1667Z" stroke="#EAEAEA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 4.5V8.5L10.6667 9.83333" stroke="#EAEAEA" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        { durationTime + " " + ( this.props.fullView ? "minute" : "min" ) } read
      </span>
    );
  }
};
