const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");
const dotenv = require('dotenv');

//the Angular app can make HTTP requests:
const cors = require('cors');
app.use(cors());

dotenv.config();

// Create an instance of the express app
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Add connection string from MongoDB (ensure it's correctly defined in your .env)
const uri = process.env.CONNECTION_STRING;

// MOngo Db connection
mongoose.connect(uri)
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.log('Failed to connect to MongoDb', err));

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to Money Safe.');
  });

//Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const userRoutes = require('./routes/UserRoutes'); // Import the user routes
app.use('/api', userRoutes); // Use the user routes
