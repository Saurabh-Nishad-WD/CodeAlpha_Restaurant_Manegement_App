const userModel = require("../models/userModel");

const adminMiddleware =  async (req,res,next) =>{
    try{
        
        const admin = await userModel.findById(req.body.id);
        if(!admin){
            return res.status(500).send({
                message:"somthing went wrong in middle",
            });
        }
        if(!admin.isOwner){
            return res.status(500).send({
                message:"Un-Authorised access",
            });
        }
        else{
            next();
        }

    }
    catch(err){
        res.status(500).send({
            message:"error middleware",
            err
        });
    }
}

module.exports = adminMiddleware;