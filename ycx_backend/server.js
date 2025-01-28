const express = require('express');
const connectDB = require('./ConfigDB/Connect');
const app = express();
const leadRoutes = require('./Routes/LeadRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config(); // Load .env variables



// Database connection
connectDB();

// Routes


// Root endpoint for testing
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies
// app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use('/api/leads', leadRoutes);
