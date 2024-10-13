const userModel = require("../models/userModel");
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

const register = async (req,res) =>{
    try{
        const{username,email,password,mobile,role,isOwner} = req.body;
        if(!username || !email || !password || !mobile){
            return res.status(404).send({
                message:"please provide all important field"
            });
        }
        const exist = await userModel.findOne({email});

        if(exist){
            return res.status(500).send({
                message:"you are allready registerd please login"
            });
        }

        const salt = bcryptjs.genSaltSync(10);
        const hashPassword = await bcryptjs.hash(password,salt);

            const newUser = await new userModel({
                username,
                email,
                password:hashPassword,
                mobile,
                role,
                isOwner
            });
            await newUser.save();
            res.status(200).send({
                message:"user successfuly registerd",
                newUser
            });
    }
    catch(err){
        res.status(500).send({
            message:"error 1",
            err
        });
    }
}
const login = async (req,res) =>{
    try{
        const{email,password} = req.body;
        if(!email || !password ){
            return res.status(404).send({
                message:"please provide all important field"
            });
        }

        const loginUser = await userModel.findOne({email});

        if(!loginUser){
            return res.status(500).send({
                message:"please provide correct data"
            });
        }

        const match = await bcryptjs.compare(password,loginUser.password);
        if(!match){
            return res.status(500).send({
                message:"inccorect email or password"
            })
        }

        const token = await jwt.sign({id:loginUser._id},process.env.jwt_key,{expiresIn:"1d"});

            res.status(200).send({
                message:"user successfuly loggedin",
                token,
                loginUser
            });

    }
    catch(err){
        res.status(500).send({
            message:"error 2",
            err
        });
    }
}

module.exports = {register,login};