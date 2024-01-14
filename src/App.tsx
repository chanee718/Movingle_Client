import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import Login from './login/Login';
import Join from './login/Join';
import Mypage from './mypage/Mypage';
import Main from './main/Main';
import LogoutButton from './login/Logout';
import EduReady from './main/EduReady';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    updateLoginStatus();
  }, []);

  const updateLoginStatus = () => {
    const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    setIsLoggedIn(!!authToken);
  };

  return (
    <Router>
      <nav className="App-nav">
        <Link to="/">Home</Link>
        <input type="text" placeholder="Search for movies" className="nav-search" />
        <Link to="/mypage">My Page</Link>
        {isLoggedIn ? (
          <LogoutButton />
        ) : (
          <Link to="/login" >Login</Link>
        )}
      </nav>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login onLoginSuccess={updateLoginStatus} />} />
          <Route path="/join" element={<Join />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/movie/:id" element={<EduReady />} />
          {/* 다른 라우트들을 여기에 추가 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
