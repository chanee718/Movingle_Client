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
    <a href="" onClick={handleLogout} style={{ color: 'white', cursor: 'pointer' }}>
      Logout
    </a>
  );
};

export default Logout;