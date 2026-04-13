const express=require('express');
const router=express.Router();
const {BookingController}=require('../../controllers');
const {BookingMiddlewares}=require('../../middlewares');


router.post('/create', BookingMiddlewares.validateCreateBooking, BookingController.createBooking);
router.patch('/payment', BookingController.makePayment);
module.exports=router;