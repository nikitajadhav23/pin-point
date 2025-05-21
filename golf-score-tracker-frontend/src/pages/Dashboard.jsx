import React, { useState, useEffect } from 'react';
import api from '../api'; 
import { Link } from 'react-router-dom';
import TestList from '../components/TestList';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
  const navigate = useNavigate();
  const playerName = localStorage.getItem('player')
  const [tests, setTests] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');

    // Redirect if not logged in
    if (!token || !playerName) {
      navigate('/login');
      return;
    }

    // Fetch player tests
    const fetchTests = async () => {
      try {
        const res = await api.get(`/tests?player=${playerName}`);
        setTests(res.data);
      } catch (err) {
        console.error('Error fetching tests:', err);
      }
    };

    fetchTests();
  }, [playerName, navigate]);

  const handleScoreChange = async (id, value) => {
    const updatedTests = tests.map((test) =>
      test._id === id ? { ...test, score: value, completed: value !== '' } : test
    );
    setTests(updatedTests);
  
    try {
      await api.put(`/tests/${id}`, {
        score: value,
        completed: value !== ''
      });
    } catch (err) {
      console.error('Error updating score:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('player');
    navigate('/login');
};
  return (
    
    <div className="container">
      <h1>{playerName}'s Dashboard</h1>
      <TestList tests={tests} onScoreChange={handleScoreChange} />
      <Link to="/">Back to Home</Link>
      <button onClick={handleLogout} style={{ marginTop: '1rem' }}>
  Logout
</button>
    </div>
  );
}

export default Dashboard;

