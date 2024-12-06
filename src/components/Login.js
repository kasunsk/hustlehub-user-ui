import React, { useState, useContext  } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import '../styles/Login.css';

const Login = () => {
  const { login, setSailorId, setFullName } = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Replace with your actual login API call
    const response = await fetch('http://localhost:8080/v1/sailor/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, password }),
    });

    if (response.ok) {
      login()
      const data = await response.json();
      console.log('Login successful:', data);
      console.log('sailorId:', data.id);
      setFullName(data.userName); //
      setSailorId(data.id); // Save sailorId to the context
      console.log('Navigating to /hustle');
      navigate('/hustle'); // Navigate to Hustle Grid page
    } else {
      setError('Invalid login credentials. Please try again or create an account.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="login-button">Login</button>
        <p>
          Don't have an account?{' '}
          <span className="create-account-link" onClick={() => navigate('/create-account')}>
            Create Account
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
