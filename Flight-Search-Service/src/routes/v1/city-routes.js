const express=require('express');
const router=express.Router();
const {cityController}=require('../../controllers');
const {cityMiddleware}=require('../../middlewares');


router.post('/create',cityMiddleware.validateCreateRequest, cityController.createCity);
router.get('/getAll', cityController.getAllCities);
router.get('/get/:id', cityController.getCity);
router.delete('/delete/:id', cityController.destroyCity);

module.exports=router;