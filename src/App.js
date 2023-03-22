/* eslint-disable jsx-a11y/anchor-is-valid */
import './App.css';
import React, { useState } from 'react';
import About from './About';
import Home from './Home';
import Projects from './Projects.js';
import Apps from './Apps.js';
import BlogChatgpt from './blogs/Blog-chatgpt'
import Card from './components/Card';

function App() {
  const [showAbout, setShowAbout] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleNavigationClick = (index) => {
    setShowAbout(index);
    setShowMenu(false);
  };

  

  return (
    <div style={{ overflow: 'auto' }}>
      <div className="navbar">
        <button className="hamburger" onClick={toggleMenu}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>
      <div className={`navbar-links ${showMenu ? 'active' : ''}`}>
        <div className="navbar-item">
          <a href="#" onClick={() => handleNavigationClick(0)}>Home</a>
          <a href="#" onClick={() => handleNavigationClick(1)}>About</a>
          <a href="#" onClick={() => handleNavigationClick(2)}>Projects</a>
          <a href="#" onClick={() => handleNavigationClick(3)}>Blogs</a>
          <a href="#" onClick={() => handleNavigationClick(4)}>Apps</a>
          <a href="Jonathan_White_CV.pdf" target="_blank">CV</a>
        </div>
      </div>
    </div>
      <div className="component-container">
        {showAbout === 0 ? <Home setShowAbout={setShowAbout} /> : null}
        {showAbout === 1 ? <About /> : null}
        {showAbout === 2 ? <Projects /> : null}
        {showAbout === 3 ?

          
          <div class="card-container">
          <div class="card-box" >
          <a href='#' style={{ textDecoration: 'none' }}>
        
          <Card image={"jwcode.uk/img/git.jpg"} title="CI pipelines with Github" text="22/03/2023 (TODO)">
            </Card></a>
          </div>
          <div class="card-box" >
            <a href="#" style={{ textDecoration: 'none' }}onClick={() => setShowAbout(5)}>
          <Card image={"./img/ai.jpg"} title="The Risks of Chatgpt" text="25/02/2023">
            </Card></a>
          </div>
          <div class="card-box" >
          <a href='#' style={{ textDecoration: 'none' }}>
        
          <Card image={"./img/dino.jpg"} title="Importance of Legacy" text="16/12/2022 (TODO)">
            </Card></a>
          </div>

        </div>: null}
        {showAbout === 4 ? <Apps /> : null}
        {showAbout === 5 ? <><BlogChatgpt /></> : null}

      </div>
    </div>
  );
}

export default App;
