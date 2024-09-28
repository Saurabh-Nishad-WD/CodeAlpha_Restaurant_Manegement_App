const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"food"
    }],
    payment:{},
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    status:{
        type:String,
        enum:['preparing','cancled','ontheway','deliverd','procecing'],
        default:'procecing'
    }
    

},{timestamps:true});

module.exports = mongoose.model("order",orderSchema);