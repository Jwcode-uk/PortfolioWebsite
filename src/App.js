/* eslint-disable jsx-a11y/anchor-is-valid */
import './App.css';
import React, { useState } from 'react';
import About from './About';
import Home from './Home';
import Projects from './Projects.js';
import Apps from './Apps.js';
import BlogChatgpt from './blogs/Blog-chatgpt'
import Card from './components/Card';
import Snake from './components/Snake'

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
          <div class="card" >
            <a href="#" onClick={() => setShowAbout(5)}>
          <Card image="https://upload.wikimedia.org/wikipedia/commons/8/81/Artificial_Intelligence_%26_AI_%26_Machine_Learning_-_30212411048.jpg" title="The Risks of Chatgpt" text="25/02/23">
            </Card></a>
          </div>
          <div class="card" >
          <a href='https://github.com/Jwcode-uk/Drone-Research'>
        
          <Card image="https://upload.wikimedia.org/wikipedia/commons/5/52/Parrot_AR.Drone_2.JPG" title="Importance of Legacy" text="Work I did investigating drone usage in search and rescue through modelling">
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
