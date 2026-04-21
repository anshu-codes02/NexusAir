const express=require('express');
const router=express.Router();
const {mailController}=require('../../controllers');


router.post('/create', mailController.createTicket);

module.exports=router;