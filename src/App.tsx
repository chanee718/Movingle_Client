import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import Login from './login/Login';
import Join from './login/Join';
import Mypage from './mypage/Mypage';
import Main from './main/Main';
import LogoutButton from './login/Logout';
import EduReady from './main/EduReady';
import Education from './main/Education';
import Search from './search/Search';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
        try {
            const response = await fetch(`http://172.10.7.55:80/search?movie=${searchTerm}`);
            const data = await response.json();
            setSearchResults(data.movies); // 검색 결과를 상태에 저장
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    fetchSearchResults();
}, [searchTerm]); // searchTerm이 변경될 때마다 실행

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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
        <Link to="/">
          <img src={require('./images/movingleText.png')} alt="Logo" className="logo-image" />
        </Link>
        <Link to="/search">
          <input 
            type="text" 
            placeholder="Search for movies" 
            className="nav-search" 
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Link>
        <Link to="/mypage" style={{ display: isLoggedIn ? 'inline' : 'none' }}>
          <p className='link'>My Page</p>
        </Link>
        {isLoggedIn ? (
          <LogoutButton />
        ) : (
          <Link to="/login" >
            <p className='link'>Login</p>
          </Link>
        )}
      </nav>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login onLoginSuccess={updateLoginStatus} />} />
          <Route path="/join" element={<Join />} />
          <Route path="/search" element={<Search searchedMovies={searchResults}/>} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/movie/:id" element={<EduReady />} />
          <Route path="/education" element={<Education />} />
          {/* 다른 라우트들을 여기에 추가 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
