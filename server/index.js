import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Lead } from './models/Lead.js';
import { Startup } from './models/Startup.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.post('/api/leads', async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    console.error('Error saving lead:', error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/leads', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/startups', async (req, res) => {
  try {
    const startup = new Startup(req.body);
    await startup.save();
    res.status(201).json(startup);
  } catch (error) {
    console.error('Error saving startup:', error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/startups', async (req, res) => {
  try {
    const startups = await Startup.find().sort({ createdAt: -1 });
    res.json(startups);
  } catch (error) {
    console.error('Error fetching startups:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});