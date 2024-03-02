
const { chatGPTResponse } = require('../services/openai');
const { openaiConfig } = require('./constants');
const { generatePrompt } = require('./prompt');

class ModelStrategy {
    constructor(req) {
        this.req = req;
        this.prompt = this.generatePrompt(req);
    }

    generatePrompt(req) {
        return generatePrompt(req);
    }

    async generateItinerary() {
      throw new Error('generateItinerary() must be implemented');
    }
}

  class Gpt3Strategy extends ModelStrategy {

    async generateItinerary(req) {
      const response = await chatGPTResponse(this.prompt, openaiConfig.gpt3);
      return response;
    }
  }
  
  class Gpt4Strategy extends ModelStrategy {
    async generateItinerary(input) {
        const response = await chatGPTResponse(this.prompt, openaiConfig.gpt4);
        return response;
      }
  }
  
// Context class that uses strategies
class ItineraryGenerator {
    constructor(model) {
      this.setStrategy(model);
    } 
    setStrategy(model) {
        this.strategy = model;
    }
    async generate(input) {
      return this.strategy.generateItinerary(input);
    }
  }
  
  // Exporting the strategies and ItineraryGenerator class
  module.exports = { Gpt3Strategy, Gpt4Strategy, ItineraryGenerator };  