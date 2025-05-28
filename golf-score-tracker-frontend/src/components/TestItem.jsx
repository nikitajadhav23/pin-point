import React from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField
} from '@mui/material';

const TestItem = ({ test, onScoreChange }) => {
  const dueDate = test.dueDate
    ? new Date(test.dueDate).toLocaleDateString()
    : 'No due date';
  const quantity = test.quantity || 0;
  const scores = Array.isArray(test.score) ? test.score : Array(quantity).fill('');

  const handleScoreChange = (index, value) => {
    const newScores = [...scores];
    newScores[index] = value;
    onScoreChange(test._id, newScores);
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
      <Typography variant="h6">{test.name}</Typography>

      <Typography variant="body2" color="text.secondary">
        Due: {dueDate}
      </Typography>

      <Box display="flex" gap={2} mt={1}>
        {Array.from({ length: quantity }).map((_, i) => (
          <TextField
            key={i}
            type="number"
            value={scores[i] || ''}
            onChange={(e) => handleScoreChange(i, e.target.value)}
            size="small"
            inputProps={{ min: 0 }}
            sx={{ width: 80 }}
          />
        ))}
      </Box>

      <Typography
        variant="body2"
        sx={{ mt: 1, color: test.completed ? 'green' : 'text.secondary' }}
      >
        {test.completed ? '✔ Completed' : 'Not done'}
      </Typography>
    </Paper>
  );
};

export default TestItem;
