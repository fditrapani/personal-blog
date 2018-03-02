import React from 'react';
import PropTypes from 'prop-types';
import Logo from "../logo";
import "./progress-indicator.css";

export default class ProgressIndicator extends React.Component {
  render() { 
    return (
      <div className="progress-indicator-wrapper">
        <div className="progress-indicator">
          <Logo logoClass="progress-indicator__logo" />
        </div>
      </div>
    );
  }
};
