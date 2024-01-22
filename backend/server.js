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

const getPlayerInfo = async (id) => {
  try {
    const { data } = await axios.get(`https://www.pdga.com/player/${id}`);
    const $ = cheerio.load(data);
    const playerInfo = { tournaments: [], years: [] };

    $('td.tournament > a').each((_idx, el) => {
      const tournament = {};
      tournament.name = $(el).text();
      tournament.href = $(el).attr('href');
      playerInfo.tournaments.push(tournament);
    });

    $('ul.tabs.secondary > li > a').each((_idx, el) => {
      let year = '';
      year = $(el).text();
      playerInfo.years.push(year);
    });

    return playerInfo;
  } catch (error) {
    throw error;
  }
};

const getTournamentsByYear = async (id, year) => {
  try {
    const { data } = await axios.get(
      `https://www.pdga.com/player/${id}/stats/${year}`
    );
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
    const playerInfo = await getPlayerInfo(req.params.id);
    res.json(playerInfo);
  } catch (error) {
    throw error;
  }
});

app.get('/player/:id/stats/:year', async (req, res) => {
  try {
    const tournaments = await getTournamentsByYear(
      req.params.id,
      req.params.year
    );
    res.json(tournaments);
  } catch (error) {
    throw error;
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
