const express = require('express');
const itineraryRoutes = require('./itinerary.js');

const router = express.Router();

const hotelRoutes = require('./hotelRoutes');
const flightRoutes = require('./flightRoutes');

/**
 * API Routes
 */
router.use('/api/v1', itineraryRoutes);

// handle hotel api requests
router.use('/api/v1/hotels', hotelRoutes);

//handle flight api requests
router.use('/api/v1/flights', flightRoutes);

module.exports = router;
