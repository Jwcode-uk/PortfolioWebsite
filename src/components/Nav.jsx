import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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

  return (
    <div className="navbar" style={background ? { backgroundColor: 'rgba(0, 0, 0, 0.5)' } : {}}>
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
        </div>
      </div>
    </div>
  );
}

Nav.propTypes = {
  background: PropTypes.bool,
};
Nav.defaultProps = {
  background: false,
};

export default Nav;
