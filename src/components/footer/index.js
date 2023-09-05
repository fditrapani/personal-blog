import React from 'react';
import "./style.scss";

export default class Footer extends React.Component {
  render() { 
    return (
      <div className="thanks">
          <a href="https://www.linkedin.com/in/filippoditrapani/" target="_blank" rel="noopener noreferrer" className="social-icon">
            Connect
          </a>
      </div>  
    );
  }
};