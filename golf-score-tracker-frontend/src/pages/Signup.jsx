import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

import {
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('player');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/api/auth/register', {

        name,
        email,
        password,
        role
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('player', res.data.user.name);
      localStorage.setItem('role', res.data.user.role);

      navigate(res.data.user.role === 'coach' ? '/coach' : '/dashboard');
    } catch (err) {
      console.error(err);
      setError('Sign up failed. That email may already be in use.');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom align="center">
        Sign Up
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />

          <FormControl fullWidth required>
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="player">Player</MenuItem>
              <MenuItem value="coach">Coach</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" fullWidth>
            Sign Up
          </Button>
        </Box>
      </form>

      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Already have an account?{' '}
        <Link to="/login" style={{ textDecoration: 'none', color: '#2e7d32' }}>
          Login
        </Link>
        <br />
        <Link to="/" style={{ textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </Typography>
    </Container>
  );
}

export default Signup;
