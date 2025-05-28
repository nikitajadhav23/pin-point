const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const User = require('../models/User'); // needed to look up players by name
const Test = require ('../models/Test');

// Create a new team and assign players to it
router.post('/', async (req, res) => {
  try {
    const { name, players } = req.body;

    // Find players by name
    const playerDocs = await User.find({ name: { $in: players } });

    // Extract ObjectIds
    const playerIds = playerDocs.map(p => p._id);

    // Create and save the team
    const team = new Team({ name, players: playerIds });
    await team.save();
 
    await User.updateMany(
      { _id: { $in: playerIds } },
      { $set: { team: name } }
    );

    res.status(201).json(team);
  } catch (err) {
    console.error('Team creation error:', err);
    res.status(500).json({ message: 'Failed to create team' });
  }
});


// Get all teams with players
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().populate('players', 'name email');
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching teams' });
  }
});


// GET /api/teams/:id/details

router.get('/:id/details', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('players', 'name email');
    if (!team) return res.status(404).json({ message: 'Team not found' });

    // Get test data for each player
    const playersWithTests = await Promise.all(
      team.players.map(async (player) => {
        const tests = await Test.find({ player: player.name });
        return {
          name: player.name,
          email: player.email,
          tests
        };
      })
    );

    res.json({
      teamName: team.name,
      players: playersWithTests
    });
  } catch (err) {
    console.error('Error fetching team details:', err);
    res.status(500).json({ message: 'Error fetching team details' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTeam);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating team' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Team deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting team' });
  }
});


module.exports = router;
