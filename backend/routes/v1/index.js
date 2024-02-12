const express = require('express');
const itineraryRoutes = require('./itinerary.js');


const router = express.Router();

/**
 * API Routes
 */
router.use('/api/v1', itineraryRoutes);

module.exports = router;