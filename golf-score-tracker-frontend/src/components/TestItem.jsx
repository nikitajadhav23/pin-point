import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  CircularProgress
} from '@mui/material';

const TestItem = ({ test, onScoreChange }) => {
  const dueDate = test.dueDate
    ? new Date(test.dueDate).toLocaleDateString()
    : 'No due date';

  const quantity = test.quantity || 0;
  const initialScores = Array.isArray(test.score) ? test.score : Array(quantity).fill('');

  const [scores, setScores] = useState(initialScores);
  const [saving, setSaving] = useState(false);
  const [savedText, setSavedText] = useState('');

  const handleScoreChange = (index, value) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
  };

  const handleBlur = async () => {
    // Only save if all scores are filled
    const isComplete = scores.every(score => score !== '');
    setSaving(true);
    setSavedText('Saving...');
    try {
      await onScoreChange(test._id, scores);
      setSavedText('Saved ✓');
    } catch {
      setSavedText('Error saving');
    } finally {
      setSaving(false);
      setTimeout(() => setSavedText(''), 2000); // Clear after 2 sec
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
      <Typography variant="h6">{test.name}</Typography>

      <Typography variant="body2" color="text.secondary">
        Due: {dueDate}
      </Typography>

      <Box display="flex" gap={2} mt={1} alignItems="center">
        {Array.from({ length: quantity }).map((_, i) => (
          <TextField
            key={i}
            type="number"
            value={scores[i] || ''}
            onChange={(e) => handleScoreChange(i, e.target.value)}
            onBlur={handleBlur}
            size="small"
            inputProps={{ min: 0 }}
            sx={{ width: 80 }}
          />
        ))}

        {saving ? (
          <CircularProgress size={20} />
        ) : (
          <Typography variant="body2" color="text.secondary">
            {savedText}
          </Typography>
        )}
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

