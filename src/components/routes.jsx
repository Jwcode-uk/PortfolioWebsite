import React from 'react';
// eslint-disable-next-line import/no-cycle
import About from '../About';
import Home from '../Home';
import Projects from '../Projects';
import Apps from '../Apps';
import Blogs from '../blogs/Blogs';
import BlogsChatgpt from '../blogs/Blog-chatgpt';
import BlogsCI from '../blogs/Blog-CI';
import BlogsLegacy from '../blogs/Blog-Legacy';
import Hikes from '../Hikes';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/apps',
    element: <Apps />,
  },
  {
    path: '/blogs',
    element: <Blogs />,
  },
  {
    path: '/projects',
    element: <Projects />,
  },
  {
    path: '/hikes',
    element: <Hikes />,
  },
  {
    path: '/blogs/The-Risks-of-Chatgpt',
    element: <BlogsChatgpt />,
  },
  {
    path: '/blogs/Github-Action-CI',
    element: <BlogsCI />,
  },
  {
    path: '/blogs/Importance-of-Legacy',
    element: <BlogsLegacy />,
  },
];

export default routes;
