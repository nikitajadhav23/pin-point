import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';

import {
  Container,
  Typography,
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function TeamDetailPage() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [allTests, setAllTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamRes = await api.get(`/api/teams/${id}/details`);
        const testsRes = await api.get('/api/tests/all');
        setTeam(teamRes.data);
        setAllTests(testsRes.data);
      } catch (err) {
        console.error('Error loading team detail:', err);
      }
    };
    fetchData();
  }, [id]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!team) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="body1">Loading team details failed or is still loading...</Typography>
        <Button component={Link} to="/coach/teams" sx={{ mt: 2 }}>
          ← Back to Teams
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Team: {team.name}
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Players
      </Typography>

      {team.players.map(player => {
        const tests = allTests.filter(test => test.player === player.name);
        const completed = tests.filter(test => test.completed).length;

        return (
          <Box key={player._id} sx={{ mb: 3 }}>
            <Typography variant="subtitle1">
              <strong>{player.name}</strong> — {completed}/{tests.length} completed
            </Typography>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>View Tests</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {tests.map(test => (
                    <ListItem key={test._id} disablePadding>
                      <ListItemText
                        primary={`${test.name} — Score: ${test.score || 'Not entered'}`}
                        secondary={
                          <>
                            {test.completed ? '✔ Completed' : '❌ Incomplete'}
                            {test.dueDate && ` — Due: ${new Date(test.dueDate).toLocaleDateString()}`}
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </Box>
        );
      })}

      <Box sx={{ mt: 4 }}>
        <Button component={Link} to="/coach/teams" variant="text">
          ← Back to Teams
        </Button>
        <Button onClick={handleLogout} variant="outlined" color="error" sx={{ ml: 2 }}>
          Logout
        </Button>
      </Box>
    </Container>
  );
}

export default TeamDetailPage;



