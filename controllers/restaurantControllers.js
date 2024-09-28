const restaurantModel = require("../models/restaurantModel");
const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");

const create = async (req,res) => {
    try{
         const user = await userModel.findOne({_id:req.body.id});
        if(!user){
            return res.status(500).send({
                message:"Un-Authorised access"
            });
           }

           if(!(user.isOwner)){
           return res.status(500).send({
               message:"only owner can create the restaurant"
           });
         }
console.log("1");
        const {password,title,logoUrl,foods,time,pickup,delivery,isOpen,rating} = req.body;

        if(!password || !title || !foods || !time){
            return res.status(500).send({
                message:"please provide important information"
            });
        }
          const isMatch =  await bcryptjs.compare(password,user.password);
          if(!isMatch){
            return res.status(500).send({
                message:"Un-Authorised access"
            });
           }
           console.log("2");


        const exist = await restaurantModel.findOne({title});
        if(exist){
            return res.status(500).send({
                message:"title is not available"
            });
        }
        console.log("3");

        const newRestaurant =  new restaurantModel({
            title,
            logoUrl,
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

const updateRestaurant = async (req,res) => {
    try{

         const user = await userModel.findOne({_id:req.body.id});
        if(!user){
            return res.status(500).send({
                message:"Un-Authorised access"
            });
           }

        const {password,title,logoUrl,foods,time,pickup,delivery,isOpen,rating} = req.body;
        if(!password || !title || !foods || time ){
            return res.status(500).send({
                message:"please provide important information"
            });
        }

        const isMatch =  await bcryptjs.compare(password,user.password);
        if(!isMatch){
          return res.status(500).send({
              message:"Un-Authorised access"
          });
         }

          const restaurant = await restaurantModel.findById(req.params.id);
          if(!restaurant){
            return res.status(500).send({
                message:"restaurant not found"
            });
          }

          if(title) restaurant.title = title;
          if(logoUrl) restaurant.logoUrl = logoUrl;
          if(foods) restaurant.foods = foods;
          if(time) restaurant.time = time;
          if(pickup) restaurant.pickup = pickup;
          if(delivery) restaurant.delivery = delivery;
          if(isOpen) restaurant.isOpen = isOpen;
          if(rating) restaurant.rating = rating;

            await restaurant.save();
            
            res.status(200).send({
                message:"restaurant updated",
                restaurant
            })
            
        }
        catch(err){
            res.status(500).send({
                message:"restaurant update error",
                err
            });
        }
    }

const deleteRestaurant = async (req,res) => {
    try{

        const user = await userModel.findOne({_id:req.body.id});
        if(!user){
            return res.status(500).send({
                message:"Un-Authorised access"
            });
           }

           if(!(user.isOwner)){
           return res.status(500).send({
               message:"only owner can delete the restaurant"
           });
         }
         const{password} = req.body;
         
         const isMatch =  await bcryptjs.compare(password,user.password);
         if(!isMatch){
           return res.status(500).send({
               message:"Un-Authorised access"
           });
          }
       
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

module.exports = {create,getAllResataurant,getResataurant,updateRestaurant,deleteRestaurant};