import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function TestPage() {
  const [testName, setTestName] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [allPlayers, setAllPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [allTests, setAllTests] = useState([]);
  const navigate = useNavigate();
  const [dueDate, setDueDate] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const playersRes = await api.get('/users/players');
        setAllPlayers(playersRes.data);
        const teamsRes = await api.get('/teams');
        setTeams(teamsRes.data);
        const testsRes = await api.get('/tests/all');
        setAllTests(testsRes.data);
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };

    fetchData();
  }, []);

  const players = allPlayers.map(p => p.name);

  const togglePlayer = (player) => {
    setSelectedPlayers(prev =>
      prev.includes(player)
        ? prev.filter(p => p !== player)
        : [...prev, player]
    );
  };

  const assignToPlayers = async (e) => {
    e.preventDefault();
    if (!testName || selectedPlayers.length === 0) return;
    try {
      await api.post('/tests/assign', { name: testName, players: selectedPlayers,  dueDate});
      setTestName('');
      setSelectedPlayers([]);
      const res = await api.get('/tests/all');
      setAllTests(res.data);
    } catch (err) {
      console.error('Error assigning to players:', err);
    }
  };

  const assignToTeam = async (e) => {
    e.preventDefault();
    if (!testName || !teamName) return;
    try {
      await api.post('/tests/assign-team', { name: testName, team: teamName, dueDate });
      setTestName('');
      setTeamName('');
      const res = await api.get('/tests/all');
      setAllTests(res.data);
    } catch (err) {
      console.error('Error assigning to team:', err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="container">
      <h1>Test Management</h1>

      {/* Assign to Players */}
      <form onSubmit={assignToPlayers} style={{ marginBottom: '2rem' }}>
        <h3>Assign Test to Players</h3>
        <input
          type="text"
          placeholder="Test Name"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          required
        />
        <input
  type="date"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
  required
/>

        <div style={{ margin: '1rem 0' }}>
          {players.map(player => (
            <label key={player} style={{ marginRight: '1rem' }}>
              <input
                type="checkbox"
                value={player}
                checked={selectedPlayers.includes(player)}
                onChange={() => togglePlayer(player)}
              />
              {player}
            </label>
          ))}
        </div>
        <button type="submit">Assign to Selected Players</button>
      </form>

      {/* Assign to Team */}
      <form onSubmit={assignToTeam} style={{ marginBottom: '2rem' }}>
        <h3>Assign Test to Team</h3>
        <input
          type="text"
          placeholder="Test Name"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          required
        />
        <input
  type="date"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
  required
/>

        <select value={teamName} onChange={(e) => setTeamName(e.target.value)} required>
          <option value="">Select Team</option>
          {teams.map(team => (
            <option key={team._id} value={team.name}>{team.name}</option>
          ))}
        </select>
        <br /><br />
        <button type="submit">Assign to Team</button>
      </form>

      {/* Navigation Buttons */}
      <div style={{ marginTop: '2rem' }}>
        <Link to="/coach">
          <button style={{ marginRight: '1rem' }}>← Back to Coach Dashboard</button>
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default TestPage;
