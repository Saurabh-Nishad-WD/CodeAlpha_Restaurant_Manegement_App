const express = require("express");
const {create,getAllResataurant, getResataurant, deleteRestaurant, updateRestaurant} = require("../controllers/restaurantControllers");
const authMiddleware = require("../middlewares/authMiddleware");

const route = express.Router();

route.post("/create",authMiddleware,create);
route.get("/getAllRestaurant",getAllResataurant);
route.get("/getRestaurant/:id",getResataurant);
route.put("/update/:id",authMiddleware,updateRestaurant);
route.delete("/delete/:id",authMiddleware,deleteRestaurant);

module.exports = route;