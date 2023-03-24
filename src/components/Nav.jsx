import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle

function Nav() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="navbar">
      <button className="hamburger" onClick={toggleMenu} type="button">
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>
      <div className={`navbar-links ${showMenu ? 'active' : ''}`}>
        <div className="navbar-item">
          <Link to="/">
            Home
          </Link>
          <Link to="/about">
            About
          </Link>
          <Link to="/projects">
            Projects
          </Link>
          <Link to="/blogs">
            Blogs
          </Link>
          <Link to="/apps">
            Apps
          </Link>
          <a href="../Jonathan_White_CV.pdf" target="_blank">
            CV
          </a>
        </div>
      </div>
    </div>
  );
}
export default Nav;
