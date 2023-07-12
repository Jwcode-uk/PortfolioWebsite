import './style/App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './components/routes';

function App() {
  return (
    <div style={{ overflow: 'auto' }}>
      <Router>
        <div className="component-container">
          <Routes>
            {routes.map((route) => (
              <Route path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
