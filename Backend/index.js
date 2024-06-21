const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection URI (replace with your actual URI)
const mongoURI = 'mongodb+srv://dalaidayasagar:12345@cluster0.yr91p5b.mongodb.net/Game?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define Player Schema
const playerSchema = new mongoose.Schema({
  name: String,
  scores: Number,
});

// Create Player model
const Player = mongoose.model('Player', playerSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
// GET top players
app.get('/players', async (req, res) => {
  try {
    const players = await Player.find().sort({ scores: -1 }).limit(5);
    res.json(players);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new player
app.post('/players', async (req, res) => {
  const { name, scores } = req.body;
  if (!name || !scores) {
    res.status(400).json({ error: 'Name and scores are required' });
    return;
  }

  try {
    const newPlayer = new Player({ name, scores });
    await newPlayer.save();
    res.status(201).json({ message: 'Player added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
