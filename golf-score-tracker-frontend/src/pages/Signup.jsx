// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [role, setRole] = useState('player');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const res = await api.post('/auth/register', {
        name,
        email,
        password,
        role
      });
  
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('player', res.data.user.name);
      localStorage.setItem('role', res.data.user.role);
  
      const userRole = res.data.user.role;
  
      if (userRole === 'coach') {
        navigate('/coach');
      } else {
        navigate('/dashboard');
      }
  
    } catch (err) {
      console.error(err);
      setError('Sign up failed. That email may already be in use.');
    }
  };
  

  return (
    <div className="container">
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="player">Player</option>
          <option value="coach">Coach</option>
        </select>
        <br /><br />
        <button type="submit">Sign Up</button>
      </form>

      {/* Add "Back to Home" button */}
      <p style={{ marginTop: '1rem' }}>
        Already have an account? <Link to="/login">Login</Link><br />
        <Link to="/">← Back to Home</Link>
      </p>
    </div>
  );
}

export default Signup;

