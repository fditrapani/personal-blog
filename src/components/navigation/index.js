import React, { Component } from 'react';
import Logo from '../logo'
import { Link } from 'react-router-dom';

class Navigation extends Component {
  showOffline = () => {
    if ( ! navigator.onLine ) {
      return (
        <span className="app-shell__nav-offline">
          offline
        </span>
      );
    }

    return null;
  }

  render() { 
    const location = this.props.location.pathname;

    return( 
      <nav className="app-shell__navigation">
        <div className="app-shell__nav-content">
  
          <Link to="/" className="app-shell__nav-icon-link">
            <Logo logoClass="app-shell__nav-icon" />
          </Link> 

          { this.showOffline() }
  
          <ul className="app-shell__nav-wrapper">
            <li className="app-shell__nav-item">
              <Link
                className={ "app-shell__nav-link" + ( location === "/" ?  ' active' : '' ) }
                to="/"
              >
                About
              </Link>
            </li>
  
            <li className="app-shell__nav-item">
              <Link
                className={ "app-shell__nav-link" + ( location === "/blog" ?  ' active' : '' ) }
                to="/blog"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>  

       
      </nav>
    )
  }
}

export default Navigation;