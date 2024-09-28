const restaurantModel = require("../models/restaurantModel");

const create = async (req,res) => {
    try{
        const {title,imageURL,foods,time,pickup,delivery,isOpen,rating} = req.body;
        if(!title || !foods || !time){
            return res.status(500).send({
                message:"please provide important information"
            });
        }
        const exist = await restaurantModel.findOne({title});
        if(exist){
            return res.status(500).send({
                message:"title is not available"
            });
        }

        const newRestaurant =  new restaurantModel({
            title,
            imageURL,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            rating
        });

        await newRestaurant.save();
        res.status(200).send({
            message:"new Restaurant created",
            newRestaurant
        });

    }
    catch(err){
        res.status(500).send({
            message:"restaurrent create err",
            err
        });
    }
}
const getAllResataurant = async (req,res) => {
    try{
        const restaurant = await restaurantModel.find({});
        res.status(200).send({
            message:`total ${restaurant.length} found`,
            restaurant
        });

    }
    catch(err){
        res.status(500).send({
            message:"restaurrent getting err",
            err
        });
    }
}
const getResataurant = async (req,res) => {
    try{
        const restaurant = await restaurantModel.findById(req.params.id);

        if(!restaurant){
            return res.status(500).send({
                message:"invalid id or information"
            });
        }
        res.status(200).send({
            message:`restaurant found`,
            restaurant
        });

    }
    catch(err){
        res.status(500).send({
            message:"restaurrent getting err",
            err
        });
    }
}
const deleteRestaurant = async (req,res) => {
    try{
       
        const isAvailable = await restaurantModel.findById(req.params.id);
        if(!isAvailable){
            return res.status(500).send({
                message:"invalid information"
            });
        }

        await restaurantModel.findByIdAndDelete(req.params.id);

        res.status(200).send({
            message:`restaurant deleted`,
        });

    }
    catch(err){
        res.status(500).send({
            message:"restaurrent deleting err",
            err
        });
    }
}

module.exports = {create,getAllResataurant,getResataurant,deleteRestaurant};