const express = require("express");
const controller = require("../../controllers/itinerary.controller");
const { celebrate: validate } = require("celebrate");

const router = express.Router();

const { itinerary, itineraryPost } = require("../../validations/itinerary");

router
  .route("/generateItinerary")
  /**
   * @api {post} api/v1/generateItinerary
   * @apiDescription process the query received by user and return the response
   * @apiVersion 1.0.0
   * @apiName auth generate TODO
   * @apiGroup auth
   */
  .post(validate(itinerary), controller.fetchItinerary);

router
  .route("/createItinerary")
  /**
   * @api {post} api/v1/createItinerary
   * @apiDescription process the query received by user and return the response
   * @apiVersion 1.0.0
   * @apiName auth generate TODO
   * @apiGroup auth
   */
  .post(validate(itineraryPost), controller.createItinerary);

router
  .route("/itineraries/:itineraryId")
  .get(controller.getItineraryByItineraryId);

router
  .route("/users/:email/itineraries")
  .get(controller.getItinerariesByUserId);

module.exports = router;
