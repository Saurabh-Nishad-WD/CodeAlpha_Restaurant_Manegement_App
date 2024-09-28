const mongoose = require('mongoose');

const connectDB = async (req,res) =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mongoDB server at ${mongoose.connection.host}`);
    }
    catch(err){
        res.status(500).send({
            message:"error",
            err
        });
    }
}

module.exports = connectDB;