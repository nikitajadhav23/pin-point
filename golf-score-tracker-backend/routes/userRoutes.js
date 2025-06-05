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

module.exports = router;
