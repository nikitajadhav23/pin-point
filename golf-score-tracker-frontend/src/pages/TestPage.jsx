import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';

function TestPage() {
  const [testName, setTestName] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [allPlayers, setAllPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [allTests, setAllTests] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playersRes = await api.get('/api/users/players');
        setAllPlayers(playersRes.data);
        const teamsRes = await api.get('/teams');
        setTeams(teamsRes.data);
        const testsRes = await api.get('/tests/all');
        setAllTests(testsRes.data);
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };

    fetchData();
  }, []);

  const players = allPlayers.map(p => p.name);

  const togglePlayer = (player) => {
    setSelectedPlayers(prev =>
      prev.includes(player)
        ? prev.filter(p => p !== player)
        : [...prev, player]
    );
  };

  const assignToPlayers = async (e) => {
    e.preventDefault();
    if (!testName || selectedPlayers.length === 0) return;
    try {
      await api.post('/api/tests/assign', { name: testName, players: selectedPlayers, dueDate, quantity });
      setTestName('');
      setSelectedPlayers([]);
      const res = await api.get('/tests/all');
      setAllTests(res.data);
    } catch (err) {
      console.error('Error assigning to players:', err);
    }
  };

  const assignToTeam = async (e) => {
    e.preventDefault();
    if (!testName || !teamName) return;
    try {
      await api.post('/api/tests/assign-team', { name: testName, team: teamName, dueDate, quantity });
      setTestName('');
      setTeamName('');
      const res = await api.get('/tests/all');
      setAllTests(res.data);
    } catch (err) {
      console.error('Error assigning to team:', err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Test Management
      </Typography>

      {/* Assign to Players */}
      <Box component="form" onSubmit={assignToPlayers} sx={{ mb: 5 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Assign Test to Players
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Test Name"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            type="number"
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            fullWidth
          />
          <TextField
            type="date"
            label="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <FormGroup row>
            {players.map(player => (
              <FormControlLabel
                key={player}
                control={
                  <Checkbox
                    checked={selectedPlayers.includes(player)}
                    onChange={() => togglePlayer(player)}
                  />
                }
                label={player}
              />
            ))}
          </FormGroup>

          <Button variant="contained" type="submit">
            Assign to Selected Players
          </Button>
        </Box>
      </Box>

      {/* Assign to Team */}
      <Box component="form" onSubmit={assignToTeam} sx={{ mb: 5 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Assign Test to Team
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Test Name"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            type="number"
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            fullWidth
          />
          <TextField
            type="date"
            label="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <FormControl required fullWidth>
            <InputLabel>Team</InputLabel>
            <Select
              value={teamName}
              label="Team"
              onChange={(e) => setTeamName(e.target.value)}
            >
              <MenuItem value="">Select Team</MenuItem>
              {teams.map(team => (
                <MenuItem key={team._id} value={team.name}>
                  {team.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" type="submit">
            Assign to Team
          </Button>
        </Box>
      </Box>

      {/* Navigation Buttons */}
      <Box display="flex" gap={2}>
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

export default TestPage;
