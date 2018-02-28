import React from 'react';
import PropTypes from 'prop-types';
import "./reading-time.css";

export default class ReadingTime extends React.Component {
  static propTypes = {
    content: PropTypes.string,
    fullView: PropTypes.bool,
  }

  static defaultProps = {
    fullView: false,
  };

  render() { 
    const durationTime = 5;//Math.round( this.props.content.replace(/(<([^>]+)>)/ig,"").split(' ').length / 200 );

    if ( this.props.fullView ){
      return (
        <span className="reading-time__minutes">
          { durationTime } minute read
        </span>
      );
    }
    
    return (
      <span className="reading-time__duration">
        { durationTime } min{ ( durationTime > 1 )? "s" : null }
      </span>
    );
  }
};
