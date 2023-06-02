const Booking = require('./bookingSchema');



function calculateTotalPrice(lanes, players) {
    let lanePrice = lanes.length * 100;
    let playersPrice = players * 120;
    let total = lanePrice + playersPrice;
    return total;
}

async function createBooking(bookedBy, reqDate, reqTime, lanes, players, shoes) {
    const totalPrice = await calculateTotalPrice(lanes, players);
    const result = await Booking.create({bookedBy, reqDate, reqTime, lanes, players, shoes, totalPrice });
    return result;
}

async function getBookingById(id) {
    const myBooking = await Booking.find({_id: id});
    return myBooking;
}

async function removeBooking(id) {
    const booking = await Booking.findByIdAndRemove({_id: id});
    return booking;
}

async function updateBooking(id, reqDate, reqTime, lanes, players, shoes, totalPrice) {
    const booking = await Booking.findByIdAndUpdate(id, {reqDate, reqTime, lanes, players, shoes, totalPrice}, {new: true});
    return booking;
}

async function checkIfAvailable(reqDate, reqTime, lanes) {
    const checkBooking = await Booking.findOne({reqDate: reqDate, reqTime: reqTime, lanes: {$in: lanes}});
    return checkBooking;
}


module.exports = {calculateTotalPrice, createBooking, getBookingById, removeBooking, updateBooking, checkIfAvailable}


