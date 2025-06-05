const express = require('express');
const router = express.Router();
const Test = require('../models/Test');
const User = require('../models/User');

// GET /api/tests/all - Fetch all tests (Coach View)
router.get('/all', async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// GET /api/tests?player=NAME - Fetch tests for a specific player
router.get('/', async (req, res) => {
  try {
    const { player } = req.query;
    const tests = await Test.find({ player });
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/tests/:id - Update a test's score/completion status
router.put('/:id', async (req, res) => {
  try {
    const updated = await Test.findByIdAndUpdate(
      req.params.id,
      {
        score: req.body.score,
        completed: req.body.completed
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error updating test' });
  }
});

// POST /api/tests - Assign a single test to a player
router.post('/', async (req, res) => {
  const { player, name } = req.body;

  if (!player || !name) {
    return res.status(400).json({ msg: 'Player and test name are required' });
  }

  try {
    const newTest = new Test({ player, name });
    const saved = await newTest.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error assigning test' });
  }
});

// POST /api/tests/assign - Assign test to multiple players
router.post('/assign', async (req, res) => {
  const { name, players, dueDate, quantity } = req.body;

  try {
    const testsToInsert = players.map(player => ({
      player,
      name,
      quantity,
      score: '',
      completed: false,
      dueDate: dueDate ? new Date(dueDate) : undefined
    }));

    await Test.insertMany(testsToInsert);
    res.status(201).json({ message: 'Tests assigned successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to assign tests' });
  }
});

// POST /api/tests/assign-team - Assign test to all players in a team
router.post('/assign-team', async (req, res) => {
  const { name, team, dueDate, quantity } = req.body;

  try {
    const users = await User.find({ team });
    if (users.length === 0) {
      return res.status(404).json({ msg: 'No users found for this team' });
    }

    const testDocs = users.map(user => ({
      name,
      player: user.name,
      quantity,
      score: '',
      completed: false,
      dueDate: dueDate ? new Date(dueDate) : undefined
    }));

    await Test.insertMany(testDocs);
    res.status(201).json({ msg: 'Test assigned to team.' });
  } catch (err) {
    console.error('Error assigning test to team:', err);
    res.status(500).json({ msg: 'Error assigning test to team' });
  }
});

module.exports = router;



