// Set up dependencies for server with express, axios, and cheerio
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

//Initialize express
const app = express();

// dotenv Config
require('dotenv').config();
const PORT = process.env.PORT || 4000;

//Mount middleware
app.use(express.json());
app.use(cors());

// Set up routes
app.get('/', (req, res) => {
  res.json({ message: 'Test Message' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
