const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");

const order = async(req,res) => {
try{
    
    const user = await userModel.findOne({_id:req.body.id});
    if(!user){
        return res.status(500).send({
            message:"Un-Authorised access"
        });
       }
       const{cart,payment,buyer,status} = req.body;

       if(!cart || cart.length == 0){
        return res.status(500).send({
            message:"please select minimum one item for order"
        });
       }

       if(!buyer){
        return res.status(500).send({
            message:"please provide your refrence"
        });
       }
       const totalItems = cart.length;
       let total = 0;
       for (const ids of cart) {
           const item = await foodModel.findById(ids);
           total += parseInt(item.price);
       }
       

       const newOrder = new orderModel({
        cart,
        payment,
        buyer,
        status
       });

       await newOrder.save();

       res.status(200).send({
        message:"order succesfully placed",
        totalItems:totalItems,
        total_amount:total,
        newOrder
       });

       total = 0;

}
catch(err){
    res.status(500).send({
        message:"order err",
        err
    });
}
}

const orderstatus = async (req,res) => {
    try{
        const{status} = req.body;
        if(!status){
            return res.status(500).send({
                message:"something went wrong in status fetching"
            });
        }
        const order = await orderModel.findByIdAndUpdate(req.params.id,{status},{new:true});
        if(!order){
            return res.status(500).send({
                message:"something went wrong in status updating"
            });
        }

        await order.save();
        res.status(200).send({
            message:"status successfully updated",
            order
        });

    }
    catch(err){
        res.status(500).send({
            message:"order status err",
            err
        });
    }
}


const deleteOrder = async (req,res) => {
    try{

        const order = await orderModel.findByIdAndDelete(req.params.id);
        if(!order){
            return res.status(500).send({
                message:"order not found to delete"
            });
        }

        res.status(200).send({
            message:"order successfully deleted",
        });

    }
    catch(err){
        res.status(500).send({
            message:"order deletion err",
            err
        });
    }
}
module.exports = {order,orderstatus,deleteOrder};