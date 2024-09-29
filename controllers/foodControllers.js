const categoryModel = require("../models/categoryModel");
const restaurantModel = require("../models/restaurantModel");
const bcryptjs = require("bcryptjs");
const userModel = require("../models/userModel");
const foodModel = require("../models/foodModel");

const create = async (req,res) => {
    try{
        const {title,imageUrl,about,price,category,taste,isAvailable,restaurant} = req.body;
        if(!title||!about ||!price ||!category ||!taste ||!isAvailable ||!restaurant){
            return res.status(500).send({
                message:"please provide important information"
            });
        }
        const exist = await foodModel.findOne({title});
        if(exist){
            return res.status(500).send({
                message:"this item is allready exists, You can update it to change"
            });
        }

        const newFood =  new foodModel({
            title,
            imageUrl,
            about,
            price,
            category,
            taste,
            isAvailable,
            restaurant
        });

        await newFood.save();
        res.status(200).send({
            message:"new food created",
            newFood
        });

    }
    catch(err){
        res.status(500).send({
            message:"food create err",
            err
        });
    }
}
const getAllFood = async (req,res) => {
    try{
        const foods = await foodModel.find({});
        res.status(200).send({
            message:`total ${foods.length} items found`,
            foods
        });

    }
    catch(err){
        res.status(500).send({
            message:"food getting err",
            err
        });
    }
}
const getFood = async (req,res) => {
    try{
        const food = await foodModel.findById(req.params.id);
        if(!food){
            return res.status(500).send({
                message:"invalid food access"
            });
        }
        res.status(200).send({
            message:`food found`,
            food
        });

    }
    catch(err){
        res.status(500).send({
            message:"food getting err",
            err
        });
    }
}
const updateFood = async (req,res) => {
    try{
            
          const food = await foodModel.findById(req.params.id);
          if(!food){
            return res.status(500).send({
                message:"food not found"
            });
          }
          const {title,imageUrl,about,category,taste,isAvailable,restaurant} = req.body;

          console.log("1");
          if(title) food.title = title;
          if(imageUrl) food.imageUrl = imageUrl;
          if(about) food.about = about;
          if(category) food.category = category;
          if(taste) food.taste = taste;
          if(isAvailable) food.isAvailable = isAvailable;
          if(restaurant) food.restaurant = restaurant;
          console.log("2");

            await food.save();
          console.log("3");
            
            res.status(200).send({
                message:"food updated",
                food
            })
            
        }
        catch(err){
            res.status(500).send({
                message:"food update error",
                err
            });
        }
    }


const deleteFood = async (req,res) => {
    try{
       
        const isAvailable = await foodModel.findById(req.params.id);
        if(!isAvailable){
            return res.status(500).send({
                message:"invalid food access"
            });
        }

        await foodModel.findByIdAndDelete(req.params.id);

        res.status(200).send({
            message:`food deleted`,
        });

    }
    catch(err){
        res.status(500).send({
            message:"food deleting err",
            err
        });
    }
}

module.exports = {create,getAllFood,getFood,updateFood,deleteFood};