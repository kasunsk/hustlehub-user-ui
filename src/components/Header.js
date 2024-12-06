import React from 'react';
import { useAuth } from '../components/AuthContext';
import '../styles/Header.css';

const Header = () => {
  const { fullName } = useAuth(); // Access fullName from context
  return (
    <header className="header">
      <h1>Hustlehub User Portal</h1>
      {fullName && <p className="logged-in-info">Logged in as {fullName}</p>}
    </header>
  );
};

export default Header;
