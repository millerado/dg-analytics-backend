// Set up dependencies for server with express, axios, and cheerio
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

//Initialize express
const app = express();

// dotenv Config
require('dotenv').config();
const PORT = process.env.PORT || 4000;

// Set up routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});
