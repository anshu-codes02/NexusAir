const express=require('express');
const router=express.Router();
const {AirplaneController}=require('../../controllers');
const {airplaneMiddleware}=require('../../middlewares');


router.post('/create',airplaneMiddleware.validateCreateRequest, AirplaneController.createAirplane);
router.get('/getAll', AirplaneController.getAllAirplanes);
router.get('/get/:id', AirplaneController.getAirplane);
router.delete('/delete/:id', AirplaneController.destroyAirplane);
router.patch('/update/:id',airplaneMiddleware.validateUpdate, AirplaneController.updateAirplane);
module.exports=router;