const reservationModel = require("../models/reservationModel");
const restaurantModel = require("../models/restaurantModel");
const userModel = require("../models/userModel");

const reservation = async(req,res) => {
    try{
        const user = await userModel.findOne({_id:req.body.id});
        if(!user){
            return res.status(500).send({
                message:"Un-Authorised access"
            });
           }
           const restaurant = await restaurantModel.findById(req.params.id);
           if(!restaurant){
               return res.status(500).send({
                   message:"restaur getting err"
               });
           }

           if(restaurant.capacity <= restaurant.currentAt){
            return res.status(200).send({
                message:"Sorry! Currently there is no avilable table in the restaur"
            });
           }

            const newReservation = new reservationModel({
            tableNo:restaurant.currentAt
           });

           await newReservation.save();

          const update =  await restaurantModel.findByIdAndUpdate(req.params.id,{ $inc: { currentAt: 1 } },{ new: true })
          await update.save()

           res.status(200).send({
            message:`your table is reserverd at Table no.${restaurant.currentAt}`,
            user:user.username,
            newReservation
        });

        }
    catch(err){
        res.status(500).send({
            message:"reservation err",
            err
        });
    }
}
const cancelReservation = async(req,res) => {
    try{
        const user = await userModel.findOne({_id:req.body.id});
        if(!user){
            return res.status(500).send({
                message:"Un-Authorised access"
            });
           }
          const reservation = await reservationModel.findByIdAndDelete(req.params.id2);

          if(!reservation){
            return res.status(500).send({
                message:"reservation not found"
            });
          }

          const update =  await restaurantModel.findByIdAndUpdate(req.params.id1,{ $inc: { currentAt: -1 } },{ new: true })
          await update.save()

          res.status(200).send({
            message:"reservation cancelled"
          })
        }
    catch(err){
        res.status(500).send({
            message:"reservation cancelation err",
            err
        });
    }
}
const remove = async(req,res) => {
    try{
        const user = await userModel.findOne({_id:req.body.id});
        if(!user){
            return res.status(500).send({
                message:"Un-Authorised access"
            });
           }

           const reservation = await reservationModel.findByIdAndDelete(req.params.id2);

           if(!reservation){
             return res.status(500).send({
                 message:"reservation not found"
             });
           }
 
           const update =  await restaurantModel.findByIdAndUpdate(req.params.id1,{ $inc: { currentAt: -1 } },{ new: true })
           await update.save();

           res.status(200).send({
            message:"reservation removed",
            reservation
          })

        }
    catch(err){
        res.status(500).send({
            message:"reservation err",
            err
        });
    }
}

module.exports = {reservation,cancelReservation,remove};