import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Stack, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

function CoachDashboard() {
  const [allPlayers, setAllPlayers] = useState([]);
  const [allTests, setAllTests] = useState([]);
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await api.get('/api/users/players');
        setAllPlayers(res.data);
      } catch (err) {
        console.error('Error fetching players:', err);
      }
    };

    const fetchAllTests = async () => {
      try {
        const res = await api.get('/api/tests/all');
        setAllTests(res.data);
      } catch (err) {
        console.error('Error fetching tests:', err);
      }
    };

    const fetchTeams = async () => {
      try {
        const res = await api.get('/api/teams');
        setTeams(res.data);
      } catch (err) {
        console.error('Error fetching teams:', err);
      }
    };

    fetchPlayers();
    fetchAllTests();
    fetchTeams();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Coach Dashboard
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        You have <strong>{teams.length}</strong> team{teams.length !== 1 && 's'},
        <strong> {allPlayers.length}</strong> player{allPlayers.length !== 1 && 's'}, and
        <strong> {allTests.length}</strong> test{allTests.length !== 1 && 's'} assigned.
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button component={Link} to="/coach/teams" variant="contained">
          View Teams
        </Button>
        <Button component={Link} to="/coach/tests" variant="contained">
          Manage Tests
        </Button>
      </Stack>

      <Box sx={{ mt: 2 }}>
        <Button component={Link} to="/" variant="text">
          ← Back to Home
        </Button>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Button onClick={handleLogout} variant="outlined" color="error">
          Logout
        </Button>
      </Box>
    </Container>
  );
}

export default CoachDashboard;





