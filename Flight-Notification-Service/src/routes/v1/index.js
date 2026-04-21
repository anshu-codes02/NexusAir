const express=require('express');
const router=express.Router();

router.use('/ticket', require('./ticket-route'));

module.exports=router;