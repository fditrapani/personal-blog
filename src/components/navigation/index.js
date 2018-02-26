import React, { Component } from 'react';
import Logo from '../logo'
import { Link } from 'react-router-dom';

class Navigation extends Component {
  render() { 
    const location = this.props.location.pathname;
    console.log(location);

    return( 
      <nav className="app-shell__navigation">
        <div className="app-shell__nav-content">
  
          <Link to="/" className="app-shell__nav-icon-link">
            <Logo logoClass="app-shell__nav-icon" />
          </Link>
  
          <ul className="app-shell__nav-wrapper">
            <li className="app-shell__nav-item">
              <Link
                className={ "app-shell__nav-link" + ( location === "/" ?  ' active' : '' ) }
                to="/"
              >
                Posts
              </Link>
            </li>
  
            <li className="app-shell__nav-item">
              <Link
                className={ "app-shell__nav-link" + ( location === "/about" ?  ' active' : '' ) }
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
        </div>  
      </nav>
    )
  }
}

export default Navigation