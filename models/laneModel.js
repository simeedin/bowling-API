
const Lanes = require('./laneSchema');
// const {getAllBookings} = require('./bookingModel');



async function createLane() {
    

    for (let i = 1; i < 9; i++) {
        await Lanes.create({
            laneNumber: i,
            price: 100
       });
    }
    
}

async function getLanes() {
    const allLanes = await Lanes.find();
    return allLanes;
}

async function getLaneByNumber(laneNumber) {
    const lane = await Lanes.find({laneNumber});
    return lane;
}




module.exports = {createLane, getLanes, getLaneByNumber}