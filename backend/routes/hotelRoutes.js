const express = require('express');
const router = express.Router();
const { searchHotelsByCity } = require('../services/amadeusService');

router.get('/search-by-city/:cityCode', async (req, res) => {
  try {
    const cityCode = req.params.cityCode;
    const data = await searchHotelsByCity(cityCode);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
