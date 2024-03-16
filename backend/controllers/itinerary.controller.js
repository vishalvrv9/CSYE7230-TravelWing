const { logger } = require('../config/logger');
const { ItineraryGenerator, Gpt4Strategy } = require('../utils/modelStrategy');
const Itinerary = require("../models/itineraryModel");
const User = require("../models/userModel");


// Controller function to handle the request
exports.fetchItinerary = async (req, res) => {
  try {
    const itinerary = new ItineraryGenerator(new Gpt4Strategy(req));
    const response = await itinerary.generate();
    if (response) {
      logger.info('Fetched the info successfully', response);
      res.json({ success: true, itinerary: response });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Itinerary could not be generated." });
    }
  } catch (error) {
    console.error("Error fetching itinerary: ", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
};

exports.createItinerary = async (req, res) => {
  try {
    const user = await User.findOne({email : req.body.email});
    const itinerary = new Itinerary( { ...req.body, userId: user._id });
    await itinerary.save();
    res.status(201).json({ success: true, itinerary });
  } catch (error) {
    console.error("Error creating itinerary: ", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
};

// Get itinerary by itinerary ID
exports.getItineraryByItineraryId = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({itineraryId :  req.params.itineraryId});

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: "Itinerary not found"
      });
    }

    res.json({
      success: true,
      itinerary
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Get itineraries by user ID
exports.getItinerariesByUserId = async (req, res) => {
  try {
    const user = await User.findOne({email : req.params.email});
    const itineraries = await Itinerary.find({ userId: user._id });

    res.json({
      success: true,
      itineraries
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
