import React from 'react';
import Logo from "../logo";

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
