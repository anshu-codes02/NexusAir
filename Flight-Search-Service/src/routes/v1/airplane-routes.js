const express=require('express');
const router=express.Router();
const {AirplaneController}=require('../../controllers');
const {airplaneMiddleware}=require('../../middlewares');


router.post('/create',airplaneMiddleware, AirplaneController.createAirplane);
router.get('/getAll', AirplaneController.getAllAirplanes);

module.exports=router;