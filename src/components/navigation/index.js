import React from 'react'
import Logo from '../logo'
import { Link } from 'react-router';

const Navigation = () => (
  <nav className="app-shell__navigation">
    <div className="app-shell__nav-content">

      <Link to="/" className="app-shell__nav-icon-link">
        <Logo logoClass="app-shell__nav-icon" />
      </Link>

      <ul className="app-shell__nav-wrapper">
        <li className="app-shell__nav-item">
          <Link
            className="app-shell__nav-link"
            to="/"
          >
            Posts
          </Link>
        </li>

        <li className="app-shell__nav-item">
          <Link
            className="app-shell__nav-link"
            to="/about"
          >
            About
          </Link>
        </li>
      </ul>
    </div>  
  </nav>
)

export default Navigation
