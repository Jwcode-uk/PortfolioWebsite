import './App.css';
import Nav from './components/Nav.js';
import React, { useState, useEffect } from 'react';

function App() {
  const [load, setload] = useState(false);

  useEffect(() => {
    setload(true);
  }, []);

  return (
    <>
      <Nav />
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '20px',
          marginLeft: '10%',
          marginRight: '10%',
          marginTop: '10%',
          maxWidth: '400px',
        }}
      >
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />

        <div className="circle-shape" style={{ margin: '0px' }}></div>
        <div
          style={{
            fontFamily: 'Montserrat, sans-serif',
            alignitems: 'center',
            color: 'black',
          }}
        >
          <h2
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '1.3rem',
              color: 'black',
            }}
          >
            <p className='wave'>👋</p> Hi, I'm Jonathan a tech enthusiast currently working at OpenText.
          </h2>

          <h2
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '1.3rem',
              color: 'black',
            }}
          >
            Feel free to reach out!
          </h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <a
              href="https://www.linkedin.com/in/jwcode/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ margin: '0px 10px' }}
            >
              <i
                className="fa fa-linkedin-square fa-3x"
                style={{ color: '#0077B5' }}
              ></i>
            </a>
            <a
              href="https://github.com/Jwcode-uk"
              target="_blank"
              rel="noopener noreferrer"
              style={{ margin: '0px 10px' }}
            >
              <i
                className="fa fa-github-square fa-3x"
                style={{ color: '#333' }}
              ></i>
            </a>
            <a
              href="mailto:Jonathan@jwcode.uk"
              target="_blank"
              rel="noopener noreferrer"
              style={{ margin: '0px 10px' }}
            >
              <i
                className="fa fa-envelope-square fa-3x"
                style={{ color: '#C9302C' }}
              ></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;