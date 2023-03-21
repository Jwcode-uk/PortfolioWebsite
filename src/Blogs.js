import './App.css';
import BlogChatgpt from './blogs/Blog-chatgpt'
import Card from './components/Card';
import React, { useState, useRef } from 'react';

function Projects() {
  const [showAbout, setShowAbout] = useState(0);

  return (
   <>{showAbout === 0 ?
    <div class="card-container">
      <div class="card" >
          <Card image="https://upload.wikimedia.org/wikipedia/commons/8/81/Artificial_Intelligence_%26_AI_%26_Machine_Learning_-_30212411048.jpg" title="The Risks of Chatgpt" text="25/02/23">
          </Card>
      </div>
    </div>  : null}
    {showAbout === 1 ?<><BlogChatgpt/></> :null}
    </> 
  );
}

export default Projects;
