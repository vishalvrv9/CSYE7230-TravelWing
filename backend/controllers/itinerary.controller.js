const mongoose = require("mongoose");
const Itinerary = require("../models/itineraryModel");

const { chatGPTResponse } = require("../services/openai"); // Adjust the path as necessary

const calculateDateDiff = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
};

const getPaceLabel = (pace) => {
  const paceMapping = {
    fast: "fast-paced",
    medium: "moderately-paced",
    slow: "relaxed-paced",
  };
  return paceMapping[pace] || "moderately-paced";
};

const generatePrompt = (req) => {
  const { destination, source, endDate, pace, startDate, travelers } = req.body;
  return `Plan a ${calculateDateDiff(
    startDate,
    endDate
  )} days trip to ${destination}  from ${source} for ${travelers} people, pace should be ${getPaceLabel(
    pace
  )} and give me an overall cost estimate at the end.`;
};

// Controller function to handle the request
exports.fetchItinerary = async (req, res) => {
  try {
    const prompt = generatePrompt(req);
    const response = await chatGPTResponse(prompt); // Adjusted to pass prompt directly
    if (response) {
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
    const itinerary = new Itinerary(req.body);
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
    const itinerary = await Itinerary.findById(req.params.itineraryId);

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
    const itineraries = await Itinerary.find({ userId: req.params.userId });

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
