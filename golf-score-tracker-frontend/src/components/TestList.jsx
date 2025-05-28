import React from 'react';
import { Box, Typography } from '@mui/material';
import TestItem from './TestItem';

const TestList = ({ tests, onScoreChange }) => {
  return (
    <Box>
      {tests.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No tests assigned.
        </Typography>
      ) : (
        tests.map((test) => (
          <TestItem key={test._id} test={test} onScoreChange={onScoreChange} />
        ))
      )}
    </Box>
  );
};

export default TestList;

