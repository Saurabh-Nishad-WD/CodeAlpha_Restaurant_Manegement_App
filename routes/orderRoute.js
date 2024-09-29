const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {order, orderstatus, deleteOrder} = require('../controllers/orderControllers');
const adminMiddleware = require("../middlewares/adminMiddleware")
const route = express.Router();

route.post('/',authMiddleware,order)
route.post('/status/:id',authMiddleware,adminMiddleware,orderstatus);
route.delete('/delete/:id',authMiddleware,adminMiddleware,deleteOrder);

module.exports = route;
