import React from 'react';
import './App.css';
import Card from './components/Card';
import Nav from './components/Nav';

function Projects() {
  return (
    <>
      <Nav />
      <div className="card-container">
        <div className="card-box">
          <a href="https://github.com/Jwcode-uk/Visual-Studio-Cobol-Tagger-Extension" style={{ textDecoration: 'none' }}>
            <Card image="./img/git.jpg" title="VSIX Tagger" text="I developed a Visual studio extension to help with a tedacious coding standard" />
          </a>
        </div>
        <div className="card-box">
          <a href="https://github.com/Jwcode-uk/Drone-Research" style={{ textDecoration: 'none' }}>

            <Card image="./img/drone.jpg" title="Drone SARS Research" text="Work I did investigating drone usage in search and rescue through modelling" />
          </a>
        </div>
        <div className="card-box">
          <a href="https://github.com/Jwcode-uk/jwcode.uk" style={{ textDecoration: 'none' }}>
            <Card image="./img/web.jpg" title="Portfolio Site" text="The code for this website. (it's my first big react project don't judge to hard)" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Projects;
