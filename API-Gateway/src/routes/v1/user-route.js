const express=require('express');
const router=express.Router();
const {userController}=require('../../controllers');
const {userMiddleware}=require('../../middlewares');

router.post('/signup', userMiddleware.validateSignUp, userController.signUp);
router.post('/signin', userMiddleware.validateSignUp, userController.signIn);

module.exports=router;