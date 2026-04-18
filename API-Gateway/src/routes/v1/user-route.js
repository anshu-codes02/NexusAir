const express=require('express');
const router=express.Router();
const {userController}=require('../../controllers');
const {userMiddleware, authMiddleware}=require('../../middlewares');

router.post('/signup', userMiddleware.validateSignUp, userController.signUp);
router.post('/signin', userMiddleware.validateSignUp, userController.signIn);
router.post('/addRole',authMiddleware.isauthenticate,authMiddleware.isAdmin, userController.addRoleToUser);

module.exports=router;