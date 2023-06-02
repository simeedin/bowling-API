const {Router} = require('express');
const router = new Router();
const moment = require('moment');
const {getLanes, getLaneByNumber} = require('../models/laneModel');
const {calculateTotalPrice, createBooking, getBookingById, removeBooking, updateBooking, checkIfAvailable} = require('../models/bookingModel');
const {checkInput, checkDateAndTime} = require('../middleware/checkInput');

router.get('/lanes', async (req, res) => {

    try {
        const lanes = await getLanes();
    
        res.json({success: true, lanes: lanes});
    } catch (error) {
        res.json({success: false, message: error});
    }
});

router.post('/booking', checkDateAndTime, checkInput, async (req, res) => {
    const {bookedBy, reqDate, reqTime, lanes, players, shoes} = req.body;

    
    const chosenLanes = await getLaneByNumber(lanes);
    // console.log(chosenLanes);
    const notAvailable = await checkIfAvailable(reqDate, reqTime, chosenLanes);

    if (notAvailable) {
        const lane = notAvailable.lanes;
    
        console.log(lane);
       
        res.json({success: false, message: `Bana ${lane} är inte tillgänglig under vald tid`})
    } else {
        try {
            const addedBooking = await createBooking(bookedBy, reqDate, reqTime, chosenLanes, players, shoes);
            res.json({success: true, booking: addedBooking});
        } catch (error) {
            res.json({success: false, message: error});
        } 
    }

   
   

});

router.get('/booking', async (req, res) => {
    const {_id} = req.body;

    try {
        const myBooking = await getBookingById(_id);
        if (myBooking.length < 1) {
            res.json({success: false, message: 'Bokning med valt id finns ej'});
        } else {
            res.json({success: true, booking: myBooking});
        }
        
    } catch (error) {
        res.json({success: false, message: error});
    }
});

router.delete('/booking', async (req, res) => {
    const {_id} = req.body;

    try {
        const removed = await removeBooking(_id);
        if (removed == null) {
            res.json({success: false, message: 'Bokning med valt id finns ej'});
        } else {
            res.json({success: true, removed: removed});
        }
        
    } catch (error) {
        res.json({success: false, message: error});
    }
});

router.put('/booking', checkDateAndTime, checkInput, async (req, res) => {
    const {_id, reqDate, reqTime, lanes, players, shoes} = req.body;
    
    const totalPrice = calculateTotalPrice(lanes, players);
    const chosenLanes = await getLaneByNumber(lanes);
    
    try {
        const updatedBooking = await updateBooking(_id, reqDate, reqTime, chosenLanes, players, shoes, totalPrice);
        res.json({success: true, booking: updatedBooking});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error});
    }
});












module.exports = router;