
const {userService}=require('../services');
const {ErrorResponse}=require('../utils/common');
const {StatusCodes}=require('http-status-codes');

async function isauthenticate(req, res, next){
    try{
    const token =req.headers['bearer-token'];
    const decode=await userService.isauthenticate(token);
    req.user=decode;
    next();
    }catch(error){
      ErrorResponse.error=error;
      const status=error.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR;
      res.status(status).json(ErrorResponse); 
    }
}

module.exports={
    isauthenticate
}