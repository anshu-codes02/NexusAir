const express=require('express');
const router=express.Router();
const {userController}=require('../../controllers');
const {userMiddleware}=require('../../middlewares');

router.post('/signup', userMiddleware.validateSignUp, userController.signUp);

module.exports=router;