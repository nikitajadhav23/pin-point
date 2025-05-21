import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';

function CreateTeamPage() {
  const [teamName, setTeamName] = useState('');
  const [allPlayers, setAllPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
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
    fetchPlayers();
  }, []);

  const togglePlayer = (playerName) => {
    setSelectedPlayers((prev) =>
      prev.includes(playerName)
        ? prev.filter((p) => p !== playerName)
        : [...prev, playerName]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teamName || selectedPlayers.length === 0) {
      alert('Please enter a team name and select at least one player.');
      return;
    }

    try {
      await api.post('/teams', {
        name: teamName,
        players: selectedPlayers,
      });
      setTeamName('');
      setSelectedPlayers([]);
      navigate('/coach/teams');
    } catch (err) {
      console.error('Error creating team:', err);
      alert('Failed to create team');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Create a New Team</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        <div style={{ margin: '1rem 0' }}>
          {allPlayers.map((player) => (
            <label key={player._id} style={{ display: 'block', marginBottom: '0.5rem' }}>
              <input
                type="checkbox"
                value={player.name}
                checked={selectedPlayers.includes(player.name)}
                onChange={() => togglePlayer(player.name)}
              />
              {player.name}
            </label>
          ))}
        </div>
        <button type="submit">Create Team</button>
      </form>

      {/* Navigation Buttons */}
      <div style={{ marginTop: '2rem' }}>
        <Link to="/coach">← Back to Coach Dashboard</Link>
        <br />
        <button onClick={handleLogout} style={{ marginTop: '1rem' }}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default CreateTeamPage;


