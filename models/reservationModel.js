const mongoose = require('mongoose');
const reservationSchema = new mongoose.Schema({
tableNo:{
    type:Number,
    default:1
},
isAvailable:{
    type:Boolean,
    default:true    
}

},{timestamps:true});

module.exports = mongoose.model("reservation",reservationSchema);