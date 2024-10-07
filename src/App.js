import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import GameDetails from './components/GameDetails';
import Home from './components/Home';
import './styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GameDetails />} /> {/* Game details route */}
      </Routes>
    </Router>
  );
}

export default App;
