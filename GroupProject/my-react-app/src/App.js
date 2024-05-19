import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import CovidTracker from './CovidTracker';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/covid-tracker">COVID-19 Tracker</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/covid-tracker" element={<CovidTracker />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
