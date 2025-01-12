const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { create, getCategory, getAllCategory, deleteCategory, updateCategory } = require('../controllers/categoryControlles');
const route = express.Router();

route.post('/create',authMiddleware,create);
route.get('/getAllCategory',getAllCategory);
route.get('/getCategory/:id',getCategory);
route.put('/updateCategory/:id',authMiddleware,updateCategory);
route.delete('/delete/:id',authMiddleware,deleteCategory);

module.exports = route;
