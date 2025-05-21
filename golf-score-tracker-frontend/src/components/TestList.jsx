
import React from 'react';
import TestItem from './TestItem';


const TestList = ({ tests, onScoreChange }) => {
  return (
    <div>
      {tests.map(test => (
        <TestItem key={test._id} test={test} onScoreChange={onScoreChange} />
      ))}
    </div>
  );
};

export default TestList;
