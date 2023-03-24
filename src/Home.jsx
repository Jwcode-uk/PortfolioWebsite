import './App.css';
import React, { useState, useEffect } from 'react';
import Terminal from './components/Terminal';
import Nav from './components/Nav';

function Home() {
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
    <>
      <Nav />
      <div className="container" style={{ overflow: 'auto' }}>
        <div className="container">
          <p>
            <p className="mainText" style={{ fontFamily: 'Montserrat, sans-serif' }}>Welcome to my portfolio</p>
            <p className="mainText" style={{ fontFamily: 'Montserrat, sans-serif', float: 'bottom' }}>
              {' '}
              Feel free to
              <span style={{ fontFamily: 'Fira Mono' }}>cd</span>
              {' '}
              around
            </p>
          </p>
        </div>
        <div style={{ alignContent: 'center', padding: '5rem' }}>
          {!isHidden && <Terminal />}
        </div>
      </div>
    </>
  );
}

export default Home;
