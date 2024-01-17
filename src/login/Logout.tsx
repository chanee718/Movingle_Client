import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('loginMail');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('loginMail');
    navigate('/');
  };

  return (
    <a href="" onClick={handleLogout} style={{ margin: '0', marginLeft: '1.5rem', marginRight: '3rem', fontFamily: 'Bold', fontSize: '1.2rem', color: 'white', cursor: 'pointer' }}>
      Logout
    </a>
  );
};

export default Logout;