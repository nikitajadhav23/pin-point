// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/users/players — return all users with role "player"
router.get('/players', async (req, res) => {
  try {
    const players = await User.find({ role: 'player' });
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching players' });
  }
});
 
router.post('/assign-team', async (req, res) => {
  const { name, team } = req.body;
  try {
    const users = await User.find({ team });
    if (users.length === 0) {
      return res.status(404).json({ msg: 'No users found for this team' });
    }
    const testDocs = users.map(user => ({
      name,
      player: user.name,
      score: '',
      completed: false
    }));
    await Test.insertMany(testDocs);
    res.status(201).json({ msg: 'Test assigned to team.' });
  } catch (err) {
    console.error('Error assigning test to team:', err);
    res.status(500).json({ msg: 'Error assigning test to team' });
  }
});


module.exports = router;
