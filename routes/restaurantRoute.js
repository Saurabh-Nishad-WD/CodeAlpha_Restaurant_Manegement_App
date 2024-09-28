const express = require("express");
const {create,getAllResataurant, getResataurant, deleteRestaurant} = require("../controllers/restaurantControllers");
const authMiddleware = require("../middlewares/authMiddleware");

const route = express.Router();

route.post("/create",authMiddleware,create);
route.get("/getAllRestaurant",getAllResataurant);
route.get("/getRestaurant/:id",getResataurant);
route.delete("/delete/:id",authMiddleware,deleteRestaurant);

module.exports = route;