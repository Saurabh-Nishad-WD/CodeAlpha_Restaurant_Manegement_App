const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true
    },
    imageUrl:{
        type:String,
        default:""
    }

},{timestamps:true});

module.exports = mongoose.model("category",categorySchema);