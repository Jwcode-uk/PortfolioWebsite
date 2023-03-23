import Card from'../components/Card';
import { Link } from 'react-router-dom';

import React from 'react';
import Nav from '../components/Nav';

function Projects() {
  return (
   <>

    <Nav />
          <div class="card-container">
          <div class="card-box" >
          <Link to="/blogs/Github-Action-CI" >
          <Card image={"./img/git.jpg"} title="CI pipelines with Github" text="22/03/2023">
            </Card></Link>
          </div>
          <div class="card-box" >
          <Link to="/blogs/The-Risks-of-Chatgpt" >
          <Card image={"./img/ai.jpg"} title="The Risks of Chatgpt" text="25/02/2023">
            </Card>        </Link>
          </div>
          <div class="card-box" >
          <Link to="/blogs/Importance-of-Legacy" >

          <Card image={"./img/dino.jpg"} title="Importance of Legacy" text="16/12/2022">
            </Card></Link>
          </div>

        </div>
    </> 
  );
}
export default Projects;