import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import routes from './routes';
import '../style/Navbar.css';

function Nav({ background }) {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const preloadRouteComponent = (route) => {
    route.element.type.preload?.();
  };

  const navbarStyle = background ? { backgroundColor: 'rgba(0, 0, 0, 0.5)' } : {};

  return (
    <div className="navbar" style={navbarStyle}>
      <button className="hamburger" onClick={toggleMenu} type="button">
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>
      <div className={`navbar-links ${showMenu ? 'active' : ''}`}>
        <div className="navbar-item">
          <Link
            to="/"
            onMouseEnter={() => preloadRouteComponent(routes.find((r) => r.path === '/'))}
          >
            Home
          </Link>
          <Link
            to="/about"
            onMouseEnter={() => preloadRouteComponent(routes.find((r) => r.path === '/about'))}
          >
            About
          </Link>
          <Link
            to="/projects"
            onMouseEnter={() => preloadRouteComponent(routes.find((r) => r.path === '/projects'))}
          >
            Projects
          </Link>
          <Link
            to="/blogs"
            onMouseEnter={() => preloadRouteComponent(routes.find((r) => r.path === '/blogs'))}
          >
            Blogs
          </Link>
          <Link
            to="/apps"
            onMouseEnter={() => preloadRouteComponent(routes.find((r) => r.path === '/apps'))}
          >
            Apps
          </Link>
          <Link
            to="/hikes"
            onMouseEnter={() => preloadRouteComponent(routes.find((r) => r.path === '/hikes'))}
          >
            Hikes
          </Link>
          <a href="../Jonathan_White_CV.pdf" target="_blank" rel="noopener noreferrer">
            CV
          </a>
        </div>
      </div>
    </div>
  );
}
export default Nav;