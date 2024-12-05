import React, { useState, useContext  } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import '../styles/CreateAccount.css';

const CreateAccount = () => {
const { setUser } = useContext(UserContext);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [sector, setSector] = useState('');
  const [tag, setTag] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateAccount = async (e) => {
    e.preventDefault();
        const requestBody = {
          userName,
          fullName,
          sector,
          tag,
          password,
        };

try {
    const response = await fetch('http://localhost:8080/v1/sailor/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
    const data = await response.json();
      setUser(data); // Store response in context
      setSuccess('Account created successfully! Please log in.');
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after success
    } else {
      const errorData = await response.json();
              setError(errorData.message || 'Failed to create account. Try again.');
    }
    } catch (error) {
    setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="create-account-container">
      <h2>Create Account</h2>
      <form onSubmit={handleCreateAccount}>
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
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Sector</label>
          <select value={sector} onChange={(e) => setSector(e.target.value)} required>
            <option value="" disabled>
              Select Sector
            </option>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <div className="form-group">
          <label>Tag</label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
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
        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}
        <button type="submit" className="create-account-button">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;
