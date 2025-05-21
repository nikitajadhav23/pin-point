import React from 'react';

const TestItem = ({ test, onScoreChange }) => {
  const dueDate = test.dueDate ? new Date(test.dueDate).toLocaleDateString() : 'No due date';
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid #ddd',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '8px'
      }}
    >
      <div>
        <strong>{test.name}</strong>
        <div style={{ fontSize: '0.85rem', color: '#555' }}>
          Due: {dueDate}
        </div>
      </div>
      <input
        type="number"
        value={test.score}
        onChange={(e) => onScoreChange(test._id, e.target.value)}
        style={{ width: '60px', marginRight: '10px' }}
      />
      {test.completed ? (
        <span style={{ color: 'green', fontWeight: 'bold' }}>✔ Completed</span>
      ) : (
        <span style={{ color: '#999' }}>Not done</span>
      )}
    </div>
  );
};

export default TestItem;
