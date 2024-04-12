const { logger } = require('../config/logger');
const { sendEmailWithPDF } = require('../utils/mails.js');


// Controller function to handle the request
exports.sendEmail = async (req, res) => {
  try {
    const response = await sendEmailWithPDF({to: req.body.to, data: req.body.data })

    if (response) {
      logger.info('Fetched the info successfully', response);
      res.json({ success: true, itinerary: response });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Itinerary could not be generated." });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
};
