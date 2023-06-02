
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingNr: {
        required: false,
        type: String
    },
    bookedBy: {
        required: true,
        type: String
    },
    reqDate: {
        required: true,
        type: String
    },
    reqTime: {
        required: true,
        type: String
    },
    lanes: {
        required: true,
        type: [{_id: mongoose.Schema.ObjectId, laneNumber: Number}],
        ref: 'Lanes'
    },
    players: {
        required: true,
        type: Number
    },
    shoes: {
        required: true,
        type: [Number]
    },
    totalPrice: {
        required: true,
        type: Number
    }
});

module.exports = mongoose.model('Booking', bookingSchema);