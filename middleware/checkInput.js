const moment = require('moment');

function checkInput(req, res, next) {
    const {players, shoes} = req.body;

    if(players == shoes.length) {
        next();
    } else {
        res.json({success: false, message: 'Antal skor måste matcha antal spelare'});
    }
}

function checkDateAndTime(req, res, next) {
    const {reqDate, reqTime} = req.body;
    const chosenDate = moment(reqDate, 'DD/MM').format('D/M');
    const chosenTime = moment(reqTime, 'H').format('H:mm');

    if(reqDate !== chosenDate) {
        res.json({success: false, message: 'Ogiltigt datum'});
    }
    else if(reqTime !== chosenTime) {
        res.json({success: false, message: 'Starttiden för bokning måste vara heltimmar'});
    } else {
        next();
    }
    

}


module.exports = {checkInput, checkDateAndTime}