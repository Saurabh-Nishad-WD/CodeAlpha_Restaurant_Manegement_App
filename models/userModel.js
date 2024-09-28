const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['owner','cheff','staff','other'],
        default: 'staff'
    },
    isOwner:{
        type:String,
        default:false
    }
},{timestamps:true});

module.exports = mongoose.model("user",userSchema);