import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';

import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';

function CreateTeamPage() {
  const [teamName, setTeamName] = useState('');
  const [allPlayers, setAllPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
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
    fetchPlayers();
  }, []);

  const togglePlayer = (playerName) => {
    setSelectedPlayers((prev) =>
      prev.includes(playerName)
        ? prev.filter((p) => p !== playerName)
        : [...prev, playerName]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teamName || selectedPlayers.length === 0) {
      alert('Please enter a team name and select at least one player.');
      return;
    }

    try {
      await api.post('/teams', {
        name: teamName,
        players: selectedPlayers,
      });
      setTeamName('');
      setSelectedPlayers([]);
      navigate('/coach/teams');
    } catch (err) {
      console.error('Error creating team:', err);
      alert('Failed to create team');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create a New Team
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
          fullWidth
        />

        <Typography variant="h6">Select Players</Typography>
        <FormGroup>
          {allPlayers.map((player) => (
            <FormControlLabel
              key={player._id}
              control={
                <Checkbox
                  checked={selectedPlayers.includes(player.name)}
                  onChange={() => togglePlayer(player.name)}
                />
              }
              label={player.name}
            />
          ))}
        </FormGroup>

        <Button type="submit" variant="contained">
          Create Team
        </Button>
      </Box>

      {/* Navigation Buttons */}
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button component={Link} to="/coach" variant="text">
          ← Back to Coach Dashboard
        </Button>
        <Button onClick={handleLogout} variant="outlined" color="error">
          Logout
        </Button>
      </Box>
    </Container>
  );
}

export default CreateTeamPage;



