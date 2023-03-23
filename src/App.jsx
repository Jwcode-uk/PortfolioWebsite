import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Projects from './Projects';
import Apps from './Apps';
import Blogs from './blogs/Blogs';
import BlogsChatgpt from './blogs/Blog-chatgpt';
import BlogsCI from './blogs/Blog-CI';

function App() {
  return (
    <div style={{ overflow: 'auto' }}>

      <Router>
        <div className="component-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/apps" element={<Apps />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blogs/The-Risks-of-Chatgpt" element={<BlogsChatgpt />} />
            <Route path="/blogs/Github-Action-CI" element={<BlogsCI />} />
            <Route path="/blogs/Importance-of-Legacy" element={<BlogsChatgpt />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
