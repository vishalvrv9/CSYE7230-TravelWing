const { logger } = require('../config/logger');
const { ItineraryGenerator, Gpt4Strategy } = require('../utils/modelStrategy');


exports.fetchItinerary = async (req, res) => {
  try {
    const itinerary = new ItineraryGenerator(new Gpt4Strategy(req));
    const response = await itinerary.generate();
    if (response) {
      logger.info('Fetched the info successfully', response);
      res.json({ success: true, itinerary: response });
    } else {
      res.status(404).json({ success: false, message: 'Itinerary could not be generated.' });
    }
  } catch (error) {
    logger.error('Error fetching itinerary: ', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request.',
    });
  }
};
