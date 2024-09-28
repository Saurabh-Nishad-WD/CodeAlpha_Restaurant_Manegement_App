const userModel = require("../models/userModel");
const bcryptjs = require('bcryptjs');

const getAllUsers = async (req,res) => {
    try{

        const users = await userModel.find({});
        res.status(200).send({
            message:`total ${users.length} found`,
            users
        })

    }
    catch(err){
        res.status(500).send({
            message:"error 1",
            err
        });
    }
}


const getUser = async (req,res) => {
    try{
        const id = req.body.id;
        if(!id){
            return res.status(500).send({
                message:"something went wrong"
            });
        }
        const user = await userModel.findOne({_id:id});

                res.status(200).send({
            message:"user found",
            user
        })

    }
    catch(err){
        res.status(500).send({
            message:"error 2",
            err
        });
    }
}
const updateUser = async (req,res) => {
    try{
        const {password,email,newPassword,mobile} = req.body;

           const user = await userModel.findOne({_id:req.body.id});

        if(email){
            user.email = email;
           }
        if(password){

            const salt = bcryptjs.genSaltSync(10)
            const hashPassword = await bcryptjs.hash(newPassword,salt);

            user.password = hashPassword;

           }
        if(mobile){
            user.mobile = mobile;
           }

           await user.save();
     
      
        res.status(200).send({
            message:"user updated",
            user
        })

    }
    catch(err){
        res.status(500).send({
            message:"error 3",
            err
        });
    }
}

const deleteUser = async (req,res) => {
    try{

         await userModel.findOneAndDelete({_id:req.body.id});
        res.status(200).send({
            message:`user deleted succesfully`
        })

    }
    catch(err){
        res.status(500).send({
            message:"error 4",
            err
        });
    }
}

module.exports = {getAllUsers,getUser,updateUser,deleteUser};