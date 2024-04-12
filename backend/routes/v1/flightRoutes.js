const express = require('express');
const router = express.Router();
const { searchFlights } = require('../../services/amadeusService');

router.get('/search-flights/', async (req, res) => {
  const { originLocationCode, destinationLocationCode, departureDate, adults } =
    req.query;
  try {
    const data = await searchFlights(
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
