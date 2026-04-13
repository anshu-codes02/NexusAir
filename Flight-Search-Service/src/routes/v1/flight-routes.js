const express = require('express');
const router=express.Router();
const {flightController}=require('../../controllers');
const {flightMiddlewares}=require('../../middlewares');

router.post('/create', flightMiddlewares.validateCreateFlight, flightController.createFlight);
router.get('/getAll', flightController.getFlights);
router.get('/:id', flightController.getFlightById);
router.patch('/updateSeats/:id', flightMiddlewares.validateUpdateSeats, flightController.updateSeats);
module.exports=router;