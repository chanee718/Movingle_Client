import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './login/Login';
import Join from './login/Join';

const App: React.FC = () => {
  return (
    <Router>
      <nav className="App-nav">
        <Link to="/">Home</Link>
        <input type="text" placeholder="Search for movies" className="nav-search" />
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
      </nav>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          {/* 다른 라우트들을 여기에 추가 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
