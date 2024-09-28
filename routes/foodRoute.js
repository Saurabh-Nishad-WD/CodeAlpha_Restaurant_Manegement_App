const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllFood, getFood, updateFood, deleteFood, create } = require('../controllers/foodControllers');
const route = express.Router();

route.post('/create',authMiddleware,create);
route.get('/getAllFood',getAllFood);
route.get('/getFood/:id',getFood);
route.put('/updateFood/:id',authMiddleware,updateFood);
route.delete('/delete/:id',authMiddleware,deleteFood);

module.exports = route;
