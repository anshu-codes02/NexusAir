const express = require('express');
const router=express.Router();
const {flightController}=require('../../controllers');
const {flightMiddlewares}=require('../../middlewares');

router.post('/create', flightMiddlewares.validateCreateFlight, flightController.createFlight);
router.get('/getAll', flightController.getFlights);
module.exports=router;