const express = require('express');
const {getUser,getAllUsers,updateUser,deleteUser} = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const route = express.Router();

route.get('/getAllUsers',authMiddleware,adminMiddleware,getAllUsers);
route.get('/getUser',authMiddleware,getUser);
route.put('/update',authMiddleware,updateUser);
route.delete('/delete',authMiddleware,deleteUser);

module.exports = route;
