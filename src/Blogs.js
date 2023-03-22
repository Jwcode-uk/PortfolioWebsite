import './App.css';
import BlogChatgpt from './blogs/Blog-chatgpt'
import Card from './components/Card';
import React, { useState, useRef } from 'react';

function Projects() {
  const [showAbout, setShowAbout] = useState(0);

  return (
   <>
    {showAbout === 1 ?<><BlogChatgpt/></> :null}
    </> 
  );
}

export default Projects;
