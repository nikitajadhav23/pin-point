import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box
} from '@mui/material';

function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isLoggedIn = !!token;

  const getDashboardPath = () => {
    if (role === 'coach') return '/coach';
    if (role === 'player') return '/dashboard';
    return '/login';
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Golf Score Tracker
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        Welcome! Click below to view your dashboard.
      </Typography>

      <Box>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={getDashboardPath()}
        >
          {isLoggedIn ? 'Go to Dashboard' : 'Login'}
        </Button>
      </Box>
    </Container>
  );
}

export default App;




