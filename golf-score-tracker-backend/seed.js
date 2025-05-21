require('dotenv').config();
const mongoose = require('mongoose');
const Test = require('./models/Test');

const MONGO_URI = process.env.MONGO_URI;

const playerTests = {
  Nikita: [
    { testName: "120 Point Putting Drill" },
    { testName: "6 Shot Wedge Test" },
    { testName: "Tour Wedge Test" }
  ],
  Cecilia: [
    { testName: "120 Point Putting Drill" },
    { testName: "6 Shot Wedge Test" },
    { testName: "Tour Wedge Test" }
  ],
  Emma: [
    { testName: "120 Point Putting Drill" },
    { testName: "6 Shot Wedge Test" },
    { testName: "Tour Wedge Test" }
  ],
  Caroline: [
    { testName: "120 Point Putting Drill" },
    { testName: "6 Shot Wedge Test" },
    { testName: "Tour Wedge Test" }
  ],
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    await Test.deleteMany({});
    console.log('Old test data removed');

    let tests = [];
    Object.keys(playerTests).forEach(playerName => {
      playerTests[playerName].forEach(test => {
        tests.push({
          player: playerName,             // ✅ match your schema
          name: test.testName,            // ✅ match your schema
          score: '',
          completed: false
        });
      });
    });

    await Test.insertMany(tests);
    console.log('Test data seeded');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();

