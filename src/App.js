import './App.css';
import React, { useState, useRef } from 'react';
import About from './About';
import Home from './Home';
import Projects from './Projects.js';
import Apps from './Apps.js';
import BlogChatgpt from './blogs/Blog-chatgpt'
import Card from './components/Card';

function App() {
  const [showAbout, setShowAbout] = useState(0);

  return (
    <div style={{ overflow: 'auto' }}>
      <div class="navbar"  >
        <div class="navbar-item">
          <a  onClick={() => setShowAbout(0)}>Home</a>
          <a  onClick={() => setShowAbout(1)}>About</a>
          <a  onClick={() => setShowAbout(2)}>Projects</a>
          <a  onClick={() => setShowAbout(3)}>Blogs</a>
          <a  onClick={() => setShowAbout(4)}>Apps</a>

        </div>
      </div>
      <div className="component-container">
        {showAbout === 0 ? <Home /> : null}
        {showAbout === 1 ? <About /> : null}
        {showAbout === 2 ? <Projects /> : null}
        {showAbout === 3 ?
          <div class="card-container">
            <div class="card" >
              <a href="#" onClick={() => setShowAbout(5)}>
                <Card image="https://upload.wikimedia.org/wikipedia/commons/8/81/Artificial_Intelligence_%26_AI_%26_Machine_Learning_-_30212411048.jpg" title="The Risks of Chatgpt" text="25/02/23">
                </Card>
              </a>
            </div>

          </div> : null}
        {showAbout === 4 ? <Apps /> : null}
        {showAbout === 5 ? <><BlogChatgpt /></> : null}

      </div>

    </div>
  );
}

export default App;
