import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isLoggedIn = !!token;

  const getDashboardPath = () => {
    if (role === 'coach') return '/coach';
    if (role === 'player') return '/dashboard';
    return '/login';
  };

  return (
    <div className="container">
      <h1>Golf Score Tracker</h1>
      <p>Welcome! Click below to view your dashboard.</p>
      {isLoggedIn ? (
        <Link to={getDashboardPath()}>Go to Dashboard</Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}

export default App;




