import React from 'react'
import Logo from '../logo'

const Navigation = () => (
  <nav className="app-shell__navigation">
    <div className="app-shell__nav-content">

      <a href="/" className="app-shell__nav-icon-link">
        <Logo logoClass="app-shell__nav-icon" />
      </a>

      <ul className="app-shell__nav-wrapper">
        <li className="app-shell__nav-item">
          <a
            className="app-shell__nav-link"
            href="/"
          >
            Posts
          </a>
        </li>

        <li className="app-shell__nav-item">
          <a
            className="app-shell__nav-link"
            href="/about"
          >
            About
          </a>
        </li>
      </ul>
    </div>  
  </nav>
)

export default Navigation
