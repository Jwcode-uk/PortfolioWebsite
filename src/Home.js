import './App.css';
import Terminal from './components/Terminal.js';
function Home() {
  return (
        <div class="container" style={{ overflow:'auto'}}>
          <div class="container" style={{ padding:"5rem"}}>
            <h1 style={{ fontFamily: "Montserrat, sans-serif" }}>Welcome to my portfolio<h1 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "3rem", float:'bottom' }}> Feel free to <span style={{ fontFamily: "Fira Mono" }}>cd</span> around</h1></h1>

          </div>
          <div style={{alignContent: "center" }}>
            <Terminal></Terminal>
          </div>
        </div>
  );
}

export default Home;
