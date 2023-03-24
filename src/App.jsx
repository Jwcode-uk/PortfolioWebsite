import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <div style={{ overflow: 'auto' }}>
      <Router>
        <div className="component-container">
          <Routes>
            {routes.map((route, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
