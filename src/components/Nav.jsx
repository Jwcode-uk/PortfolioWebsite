import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import {
  preloadHome, preloadAbout, preloadApps, preloadBlogs, preloadProjects,
} from './preload.js'; // Assuming you've imported the functions from a separate file

function Nav() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const preloadComponent = (preloadFunction) => {
    preloadFunction();
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
          <Link to="/" onMouseEnter={() => preloadComponent(preloadHome)}>
            Home
          </Link>
          <Link to="/about" onMouseEnter={() => preloadComponent(preloadAbout)}>
            About
          </Link>
          <Link to="/projects" onMouseEnter={() => preloadComponent(preloadProjects)}>
            Projects
          </Link>
          <Link to="/blogs" onMouseEnter={() => preloadComponent(preloadBlogs)}>
            Blogs
          </Link>
          <Link to="/apps" onMouseEnter={() => preloadComponent(preloadApps)}>
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
