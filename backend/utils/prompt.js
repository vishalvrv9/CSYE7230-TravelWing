const calculateDateDiff = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };
  

const getPaceLabel = (pace) => {
    const paceMapping = {
      fast: 'fast-paced',
      medium: 'moderately-paced',
      slow: 'relaxed-paced',
    };
    return paceMapping[pace] || 'moderately-paced';
  };
  

exports.generatePrompt = (req) => {
  
    const { destination, source, endDate, pace, startDate, travelers, placesToAvoid, flightTimePreference } = req.body;
  
    let prompt = `Plan a ${calculateDateDiff(startDate, endDate)} days vacation to ${destination} from ${source} for ${travelers} people, pace should be ${getPaceLabel(pace)}.`;
  
    if (flightTimePreference) {
      prompt += ` Prefer flight times around ${flightTimePreference}.`;
    }
  
    if (placesToAvoid && placesToAvoid.length > 0) {
      const placesToAvoidText = placesToAvoid.join(", ");
      prompt += ` Please Avoid the following places: ${placesToAvoidText}.`;
    }
  
    prompt += ` Include a weather warning based on travel Month provided in Start Date ${startDate}`;
    prompt += " Be specific about everyday's itinerary, and Give me an overall cost estimate at the end.";
  
    return prompt;
  };
  