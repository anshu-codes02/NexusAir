const express=require('express');
const router=express.Router();
const {airportController}=require('../../controllers');
const {airportMiddleware}=require('../../middlewares');


router.post('/create',airportMiddleware.validateCreateRequest, airportController.createAirport);
router.get('/getAll', airportController.getAllAirports);
router.get('/get/:id', airportController.getAirport);
router.delete('/delete/:id', airportController.destroyAirport);
router.patch('/update/:id',airportMiddleware.validateUpdateRequest, airportController.updateAirport);
module.exports=router;