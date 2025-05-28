// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes'); 
const userRoutes = require('./routes/userRoutes');
const teamRoutes = require('./routes/teamRoutes');
 
const app = express();

//  Enable CORS for frontend
app.use(cors({
  origin: 'https://pin-point-nu.vercel.app/',
  credentials: true
}));

//  Parse JSON bodies
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/users', userRoutes);
app.use('/api/teams',teamRoutes);
 

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found' });
});

//  Connect to MongoDB, then start server
const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));



