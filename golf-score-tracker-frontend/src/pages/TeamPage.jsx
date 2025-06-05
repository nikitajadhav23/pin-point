import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';

import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

function TeamPage() {
  const [teams, setTeams] = useState([]);
  const [allTests, setAllTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsRes, testsRes] = await Promise.all([
          api.get('/api/teams'),
          api.get('/api/tests/all')
        ]);
        setTeams(teamsRes.data);
        setAllTests(testsRes.data);
      } catch (err) {
        console.error('Error fetching team/test data:', err);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Teams
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Button
          component={Link}
          to="/coach/teams/create"
          variant="contained"
          startIcon={<span>➕</span>}
        >
          Create New Team
        </Button>
      </Box>

      {teams.map(team => (
        <Card key={team._id} sx={{ mb: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              component={Link}
              to={`/coach/teams/${team._id}`}
              sx={{ textDecoration: 'none', color: 'primary.main' }}
            >
              {team.name}
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              Players: {team.players.map(p => p.name).join(', ')}
            </Typography>

            {team.players.map(player => {
              const playerTests = allTests.filter(test => test.player === player.name);
              return (
                <Box key={player._id} sx={{ ml: 2, mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {player.name}
                  </Typography>
                  <List dense>
                    {playerTests.length > 0 ? (
                      playerTests.map(test => (
                        <ListItem key={test._id} sx={{ pl: 0 }}>
                          <ListItemText
                            primary={`${test.name}: ${test.score || 'Not entered'}`}
                            secondary={`${test.completed ? '✔ Completed' : '❌ Incomplete'}${
                              test.dueDate ? ` — Due: ${new Date(test.dueDate).toLocaleDateString()}` : ''
                            }`}
                          />
                        </ListItem>
                      ))
                    ) : (
                      <ListItem>
                        <ListItemText primary="No tests assigned" />
                      </ListItem>
                    )}
                  </List>
                </Box>
              );
            })}
          </CardContent>
        </Card>
      ))}

      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
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

export default TeamPage;



