const express=require('express');
const router=express.Router();

router.get('/info', async (req, res)=>{
    return res.json({success: true});
})
router.use('/booking', require('./booking-routes'));
module.exports=router;