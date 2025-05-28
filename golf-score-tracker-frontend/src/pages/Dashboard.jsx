import React, { useState, useEffect } from 'react';
import api from '../api'; 
import { Link, useNavigate } from 'react-router-dom';
import TestList from '../components/TestList';

import { Container, Typography, Button, Box } from '@mui/material';

function Dashboard() {
  const navigate = useNavigate();
  const playerName = localStorage.getItem('player');
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token || !playerName) {
      navigate('/login');
      return;
    }

    const fetchTests = async () => {
      try {
        const res = await api.get(`/tests?player=${playerName}`);
        setTests(res.data);
      } catch (err) {
        console.error('Error fetching tests:', err);
      }
    };

    fetchTests();
  }, [playerName, navigate]);

  const handleScoreChange = async (id, newScores) => {
    const completed = newScores.every(score => score !== '');

    const updatedTests = tests.map(test =>
      test._id === id ? { ...test, score: newScores, completed } : test
    );
    setTests(updatedTests);

    try {
      await api.put(`/tests/${id}`, { score: newScores, completed });
    } catch (err) {
      console.error('Error updating score:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('player');
    navigate('/login');
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {playerName}'s Dashboard
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TestList tests={tests} onScoreChange={handleScoreChange} />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button component={Link} to="/" variant="text">
          Back to Home
        </Button>
        <Button onClick={handleLogout} variant="outlined" color="error">
          Logout
        </Button>
      </Box>
    </Container>
  );
}

export default Dashboard;


