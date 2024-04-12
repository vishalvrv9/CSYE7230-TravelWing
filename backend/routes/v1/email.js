const express = require("express");
const controller = require("../../controllers/email.controller");

const router = express.Router();


router
  .route("/")
  /**
   * @api {post} api/v1/generateItinerary
   * @apiDescription process the query received by user and return the response
   * @apiVersion 1.0.0
   * @apiName auth generate TODO
   * @apiGroup auth
   */
  .post(controller.sendEmail);
  
  module.exports = router;
