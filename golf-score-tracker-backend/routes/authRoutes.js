const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  console.log('Register route hit');
  console.log('Request body:', req.body);
  const { name, email, password,role } = req.body;
  try {
    const existing = await User.findOne({ email });
 
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const user = new User({ name, email, password,role });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name,role:user.role } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// login existing users
router.post('/login', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name,role:user.role } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});
// POST /api/tests/assign
router.post('/assign', async (req, res) => {
  const { name, players } = req.body;
  try {
    const newTests = players.map(player => ({
      name,
      player,
      score: '',
      completed: false
    }));
    await Test.insertMany(newTests);
    res.status(201).json({ message: 'Tests assigned successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error assigning tests' });
  }
});

// GET /api/users/players
router.get('/players', async (req, res) => {
  try {
    const players = await User.find({ role: 'player' }, 'name email');
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching players' });
  }
});

module.exports = router;
