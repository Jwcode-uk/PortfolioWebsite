import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import routes from './routes';

function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const preloadRouteComponent = (route) => {
    route.element.type.preload?.();
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
          <a href="../Jonathan_White_CV.pdf" target="_blank">
            CV
          </a>
        </div>
      </div>
    </div>
  );
}
export default Nav;
