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

const getTournamentsPlayed = async (id) => {
  try {
    const { data } = await axios.get(`https://www.pdga.com/player/${id}`);
    const $ = cheerio.load(data);
    const tournaments = [];

    $('td.tournament > a').each((_idx, el) => {
      const tournament = {};
      tournament.name = $(el).text();
      tournament.href = $(el).attr('href');
      tournaments.push(tournament);
    });

    return tournaments;
  } catch (error) {
    throw error;
  }
};

// Set up routes
app.get('/', (req, res) => {
  res.json({ message: 'Test Message!' });
});

app.get('/player/:id', async (req, res) => {
  try {
    const tournaments = await getTournamentsPlayed(req.params.id);
    res.json(tournaments);
  } catch (error) {
    throw error;
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
