const mongoose = require('mongoose');
const restaurantSchema = new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true
    },
    logoUrl:{
        type:String,
        unique:true,
        default:""
    },
    foods:[{
        type:Array,
        required:true
    }],
    time:{
        type:String,
        required:true
    },
    pickup:{
        type:Boolean,
        default:true
    },
    delivery:{
        type:Boolean,
        default:true
    },
    isOpen:{
        type:Boolean,
        default:true
    },
    rating:{
        type:Number,
        default:0,
        enum:['0','1','2','3','4','5']
    }
},{timestamps:true});

module.exports = mongoose.model("restaurant",restaurantSchema);