const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    itineraryId: {
        type: mongoose.Schema.Types.ObjectId,
        default: function() { return new mongoose.Types.ObjectId() },
        unique: true,
        index: true
    },

    source : {
        type: String
    },

    destination : {
        type: String,
        required: [true, 'Destination is required']
    },

    startDate : {
        type: Date,
        required: [true, 'Start date is required']
    },

    endDate : {
        type: Date,
        required: [true, 'End date is required']
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }   
}, { timestamps: true });

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;