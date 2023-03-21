import './App.css';
import Card from './components/Card';

function Projects() {
    return (
            <div class="card-container">
  <div class="card" >
    <a href='https://github.com/Jwcode-uk/Visual-Studio-Cobol-Tagger-Extension'>
  <Card image="https://raw.githubusercontent.com/jmaxwilson/vscode-povray/master/images/vscode-povray-demo.gif" title="VSIX Tagger" text="I developed a Visual studio extension to help with a tedacious coding standard">
    </Card></a>
  </div>
  <div class="card" >
  <a href='https://github.com/Jwcode-uk/Drone-Research'>

  <Card image="https://upload.wikimedia.org/wikipedia/commons/5/52/Parrot_AR.Drone_2.JPG" title="Drone SARS Research" text="Work I did investigating drone usage in search and rescue through modelling">
    </Card></a>
  </div>
  <div class="card" >
  <a href='https://github.com/Jwcode-uk/jwcode.uk'>
  <Card image="https://upload.wikimedia.org/wikipedia/commons/f/f4/Build-website.jpg" title="Portfolio Site" text="The code for this website. (it's my first big react project don't judge to hard)">
    </Card></a>
  </div>
</div>
    );
}

export default Projects;
