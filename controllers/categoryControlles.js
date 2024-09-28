const categoryModel = require("../models/categoryModel");
const restaurantModel = require("../models/restaurantModel");
const bcryptjs = require("bcryptjs");
const userModel = require("../models/userModel");

const create = async (req,res) => {
    try{
        const {title,imageUrl} = req.body;
        if(!title){
            return res.status(500).send({
                message:"please provide important information"
            });
        }
        const exist = await restaurantModel.findOne({title});
        if(exist){
            return res.status(500).send({
                message:"this item is allready exists"
            });
        }

        const newCategory =  new categoryModel({
            title,
            imageUrl
        });

        await newCategory.save();
        res.status(200).send({
            message:"new category created",
            newCategory
        });

    }
    catch(err){
        res.status(500).send({
            message:"category create err",
            err
        });
    }
}
const getAllCategory = async (req,res) => {
    try{
        const category = await categoryModel.find({});
        res.status(200).send({
            message:`total ${category.length} item found`,
            category
        });

    }
    catch(err){
        res.status(500).send({
            message:"category getting err",
            err
        });
    }
}
const getCategory = async (req,res) => {
    try{
        const category = await categoryModel.findById(req.params.id);
        if(!category){
            return res.status(500).send({
                message:"invalid category access"
            });
        }
        res.status(200).send({
            message:`category found`,
            category
        });

    }
    catch(err){
        res.status(500).send({
            message:"category getting err",
            err
        });
    }
}
const updateCategory = async (req,res) => {
    try{

        const {password,title,imageUrl} = req.body;
        if(!password || !title){
            return res.status(500).send({
                message:"please provide important information"
            });
        }

          const category = await categoryModel.findById(req.params.id);
          if(!category){
            return res.status(500).send({
                message:"category not found"
            });
          }
          
            if(title){
                category.title = title;
            }
            if(imageUrl){
                category.imageUrl = imageUrl;
            }

            await category.save();
            
            res.status(200).send({
                message:"category updated",
                category
            })
            
        }
        catch(err){
            res.status(500).send({
                message:"cetogary update error",
                err
            });
        }
    }


const deleteCategory = async (req,res) => {
    try{
       
        const isAvailable = await categoryModel.findById(req.params.id);
        if(!isAvailable){
            return res.status(500).send({
                message:"invalid category"
            });
        }

        await categoryModel.findByIdAndDelete(req.params.id);

        res.status(200).send({
            message:`category deleted`,
        });

    }
    catch(err){
        res.status(500).send({
            message:"category deleting err",
            err
        });
    }
}

module.exports = {create,getAllCategory,getCategory,updateCategory,deleteCategory};