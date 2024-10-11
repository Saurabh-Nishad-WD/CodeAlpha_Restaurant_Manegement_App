const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/authMiddleware');
const {reservation, cancelReservation, remove} = require('../controllers/reservationController');
const route = express.Router();

route.get('/:id',authMiddleware,reservation)
route.delete('/cancel/:id1/:id2',authMiddleware,cancelReservation)
route.delete('/remove/:id1/:id2',authMiddleware,adminMiddleware,remove)


module.exports = route;
