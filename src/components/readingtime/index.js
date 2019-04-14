import React from 'react';
import PropTypes from 'prop-types';
import "./reading-time.scss";

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
      <span className={ this.props.fullView ? "reading-time__post" : "reading-time__listing"}>
        { durationTime + " " + ( this.props.fullView ? "minute" : "min" ) } read
      </span>
    );
  }
};
