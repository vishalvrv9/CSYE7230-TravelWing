const { Joi, Segments } = require('celebrate');


module.exports = {
    // POST /api/v1/generateIternary/
    itinerary: {
        [Segments.BODY]: Joi.object().keys({
            source: Joi.string().required(),
            destination: Joi.string().required(),
            endDate: Joi.date().greater(Joi.ref('startDate')).required(),
            pace: Joi.string().required(),
            startDate: Joi.date().required(),
            travelers: Joi.number().integer().min(1).required(),
            userId: Joi.string()
          })
    },
}