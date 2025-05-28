import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

import {
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Box
} from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });

      const role = res.data.user.role;
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('player', res.data.user.name);
      localStorage.setItem('role', role);

      navigate(role === 'coach' ? '/coach' : '/dashboard');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />

          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />

          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </Box>
      </form>

      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Don&apos;t have an account?{' '}
        <Link to="/signup" style={{ textDecoration: 'none', color: '#2e7d32' }}>
          Sign up here
        </Link>
      </Typography>
    </Container>
  );
}

export default Login;


