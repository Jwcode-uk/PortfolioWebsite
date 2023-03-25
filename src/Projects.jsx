import React from 'react';
import './App.css';
import Card from './components/Card';
// eslint-disable-next-line import/no-cycle
import Nav from './components/Nav';

function Projects() {
  return (
    <>
      <Nav />
      <div className="card-container">
        <div className="card-box">
          <a href="https://github.com/Jwcode-uk/Visual-Studio-Cobol-Tagger-Extension" style={{ textDecoration: 'none' }}>
            <Card image="./img/git.jpg" title="VSIX Tagger" text="Created a Visual Studio extension aimed at streamlining a challenging coding standard" />
          </a>
        </div>
        <div className="card-box">
          <a href="https://github.com/Jwcode-uk/Drone-Research" style={{ textDecoration: 'none' }}>
            <Card image="./img/drone.jpg" title="Drone Research" text="Conducted research on the utilization of drones in search and rescue operations through the development of models" />
          </a>
        </div>
        <div className="card-box">
          <a href="https://github.com/Jwcode-uk/PortfolioWebsite" style={{ textDecoration: 'none' }}>
            <Card image="./img/web.jpg" title="Portfolio Site" text="Developed this React website as a personal learning project, which represents my first major undertaking in React" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Projects;
