import React from 'react';
import "./style.scss";

export default class Footer extends React.Component {
  render() { 
    return (
      <div className="thanks">
          <a href="https://www.linkedin.com/in/filippoditrapani/" target="_blank" rel="noopener noreferrer" className="social-icon social-icon--linkedin">
            <svg viewBox="0 0 27.25 27.75"><title>LinkedIn</title><path d="M6.6,26.51H1.25V9.33H6.6ZM3.93,7A3.1,3.1,0,1,1,7,3.89,3.09,3.09,0,0,1,3.93,7ZM26.59,26.51H21.26V18.16c0-2,0-4.56-2.78-4.56s-3.2,2.17-3.2,4.41v8.5H10V9.33h5.11v2.35h.08A5.6,5.6,0,0,1,20.19,8.9c5.4,0,6.4,3.56,6.4,8.19Z"/></svg>
            LinkedIn
          </a>

          <a href="https://twitter.com/filippodt" target="_blank" rel="noopener noreferrer" className="social-icon social-icon--twitter">
            <svg viewBox="0 0 400 400"><title>Twitter</title><path d="M153.6,301.6c94.3,0,145.9-78.2,145.9-145.9,0-2.2,0-4.4-.1-6.6A104.47,104.47,0,0,0,325,122.5a103.93,103.93,0,0,1-29.5,8.1,51.59,51.59,0,0,0,22.6-28.4,102,102,0,0,1-32.6,12.4,51.29,51.29,0,0,0-88.7,35.1,56.68,56.68,0,0,0,1.3,11.7A145.61,145.61,0,0,1,92.4,107.8a51.48,51.48,0,0,0,15.9,68.5,51.87,51.87,0,0,1-23.2-6.4v.7a51.39,51.39,0,0,0,41.1,50.3,51.58,51.58,0,0,1-23.1.9A51.28,51.28,0,0,0,151,257.4a102.85,102.85,0,0,1-63.7,22,98.68,98.68,0,0,1-12.2-.7,145.86,145.86,0,0,0,78.5,22.9"/></svg>
            Twitter
          </a>
      </div>  
    );
  }
};