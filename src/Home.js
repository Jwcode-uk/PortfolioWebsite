import './App.css';
import Terminal from './components/Terminal.js';
import React, { useState, useEffect } from 'react';
function Home({setShowAbout}) {

  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };

    handleResize(); // Initial check for hiding the element
    window.addEventListener('resize', handleResize);

    // Clean up the listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
        <div class="container" style={{ overflow:'auto'}}>
          <div class="container" >
            <p>
            <p class="mainText" style={{ fontFamily: "Montserrat, sans-serif" }}>Welcome to my portfolio</p>
            <p class="mainText" style={{ fontFamily: "Montserrat, sans-serif", float:'bottom' }}> Feel free to <span style={{ fontFamily: "Fira Mono" }}>cd</span> around</p>
            </p>
          </div>
          <div style={{alignContent: "center", padding:"5rem" }}>
            {!isHidden &&<Terminal setShowAbout={setShowAbout} ></Terminal>}
          </div>
        </div>
  );
}

export default Home;
