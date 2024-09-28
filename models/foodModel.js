const mongoose = require('mongoose');
const foodSchema = new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true
    },
    imageUrl:{
        type:String,
        default:""
    },
    about:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
        required:true
    },
    taste:{
        type:String,
        required:true
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"restaurant",
        required:true
    }

},{timestamps:true});

module.exports = mongoose.model("food",foodSchema);