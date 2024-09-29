const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");

const order = async(req,res) => {
try{
    console.log("0");

    
    const user = await userModel.findOne({_id:req.body.id});
    if(!user){
        return res.status(500).send({
            message:"Un-Authorised access"
        });
       }
       const{cart,payment,buyer,status} = req.body;

       if(!cart){
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
       cart.map((item) => {
        total = total + parseFloat(item.price);
       });

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
module.exports = {order,orderstatus};