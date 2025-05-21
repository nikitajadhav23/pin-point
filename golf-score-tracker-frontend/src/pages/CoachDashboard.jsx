import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';

function CoachDashboard() {
  const [allPlayers, setAllPlayers] = useState([]);
  const [allTests, setAllTests] = useState([]);
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await api.get('/users/players');
        setAllPlayers(res.data);
      } catch (err) {
        console.error('Error fetching players:', err);
      }
    };

    const fetchAllTests = async () => {
      try {
        const res = await api.get('/tests/all');
        setAllTests(res.data);
      } catch (err) {
        console.error('Error fetching tests:', err);
      }
    };

    const fetchTeams = async () => {
      try {
        const res = await api.get('/teams');
        setTeams(res.data);
      } catch (err) {
        console.error('Error fetching teams:', err);
      }
    };

    fetchPlayers();
    fetchAllTests();
    fetchTeams();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="container">
      <h1>Coach Dashboard</h1>

      {/* Summary Line */}
      <p>
        You have <strong>{teams.length}</strong> team{teams.length !== 1 && 's'},
        <strong> {allPlayers.length}</strong> player{allPlayers.length !== 1 && 's'}, and
        <strong> {allTests.length}</strong> test{allTests.length !== 1 && 's'} assigned.
      </p>

      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/coach/teams" style={{ marginRight: '1rem' }}>View Teams</Link>
        <Link to="/coach/tests">Manage Tests</Link>
      </div>

      <Link to="/">← Back to Home</Link>
      <button onClick={handleLogout} style={{ marginTop: '1rem' }}>
        Logout
      </button>
    </div>
  );
}

export default CoachDashboard;




