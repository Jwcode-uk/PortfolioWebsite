import { Link } from 'react-router-dom';

import React from 'react';
import Card from '../components/Card';
import Nav from '../components/Nav';

function Projects() {
  return (
    <>

      <Nav />
      <div className="card-container">
        <div className="card-box">
          <Link to="/blogs/Github-Action-CI">
            <Card image="./img/git.jpg" title="CI pipelines with Github" text="22/03/2023" />
          </Link>
        </div>
        <div className="card-box">
          <Link to="/blogs/The-Risks-of-Chatgpt">
            <Card image="./img/ai.jpg" title="The Risks of Chatgpt" text="25/02/2023" />
            {' '}

          </Link>
        </div>
        <div className="card-box">
          <Link to="/blogs/Importance-of-Legacy">

            <Card image="./img/dino.jpg" title="Importance of Legacy" text="16/12/2022" />
          </Link>
        </div>

      </div>
    </>
  );
}
export default Projects;
