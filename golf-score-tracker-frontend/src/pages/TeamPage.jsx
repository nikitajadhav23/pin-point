import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';

function TeamPage() {
  const [teams, setTeams] = useState([]);
  const [allTests, setAllTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsRes, testsRes] = await Promise.all([
          api.get('/teams'),
          api.get('/tests/all')
        ]);
        setTeams(teamsRes.data);
        setAllTests(testsRes.data);
      } catch (err) {
        console.error('Error fetching team/test data:', err);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="container">
      <h1>All Teams</h1>
      <Link to="/coach/teams/create">
        <button style={{ marginBottom: '1rem' }}>➕ Create New Team</button>
      </Link>

      {teams.map(team => (
        <div key={team._id} style={{ marginBottom: '2rem' }}>
          <h3>{team.name}</h3>
          <p>Players: {team.players.map(p => p.name).join(', ')}</p>
          {team.players.map(player => {
            const playerTests = allTests.filter(test => test.player === player.name);
            return (
              <div key={player._id} style={{ marginLeft: '1rem' }}>
                <strong>{player.name}</strong>
                <ul>
                  {playerTests.length > 0 ? (
                    playerTests.map(test => (
                      <li key={test._id}>
                        {test.name}: {test.score || 'Not entered'} ({test.completed ? '✔ Completed' : '❌ Incomplete'})
                        {test.dueDate && <span> — Due: {new Date(test.dueDate).toLocaleDateString()}</span>}
                      </li>
                    ))
                  ) : (
                    <li>No tests assigned</li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      ))}

      <div style={{ marginTop: '1rem' }}>
        <Link to="/coach">← Back to Coach Dashboard</Link> 
      </div>
      <button onClick={handleLogout} style={{ marginTop: '1rem' }}>
        Logout
      </button>
    </div>
  );
}

export default TeamPage;




