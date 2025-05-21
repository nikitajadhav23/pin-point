// routes/testRoutes.js
const express = require('express');
const router = express.Router();
const Test = require('../models/Test');
const User = require('../models/User');

router.get('/all', async (req, res) => {
  try {
    const tests = await Test.find(); // returns all tests
    res.json(tests);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});
 
router.get('/', async (req, res) => {
  try {
    const player = req.query.player;
    const tests = await Test.find({ player });
    res.json(tests); // <-- THIS is important
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET all players and their tests (Coach View)


// PUT /api/tests/:id
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

// POST /api/tests
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

// POST /api/tests/assign
router.post('/assign', async (req, res) => {
  const { name, players } = req.body;

  try {
    const testsToInsert = players.map(player => ({
      player,
      name,
      score: '',
      completed: false,
      dueDate: dueDate ? new Date(dueDate) : undefined
    }));

    await Test.insertMany(testsToInsert);
    res.json({ message: 'Tests assigned successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to assign tests' });
  }
});
router.post('/assign-team', async (req, res) => {
  const { name, team, dueDate } = req.body; // ✅ Add dueDate here

  try {
    const users = await User.find({ team });
    if (users.length === 0) {
      return res.status(404).json({ msg: 'No users found for this team' });
    }

    const testDocs = users.map(user => ({
      name,
      player: user.name,
      score: '',
      completed: false,
      dueDate  
    }));

    await Test.insertMany(testDocs);
    res.status(201).json({ msg: 'Test assigned to team.' });
  } catch (err) {
    console.error('Error assigning test to team:', err);
    res.status(500).json({ msg: 'Error assigning test to team' });
  }
});




module.exports = router;



