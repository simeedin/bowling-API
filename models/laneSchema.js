const mongoose = require('mongoose');




const laneSchema = new mongoose.Schema({
    laneNumber: {
        required: true,
        type: Number
    },
    price: {
        required: true,
        type: Number
    }
});

module.exports = mongoose.model('Lanes', laneSchema);