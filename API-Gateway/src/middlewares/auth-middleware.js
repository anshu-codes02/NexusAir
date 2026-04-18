
const {userService}=require('../services');
const {ErrorResponse}=require('../utils/common');
const {StatusCodes}=require('http-status-codes');

async function isauthenticate(req, res, next){
    try{
    const token =req.headers['bearer-token'];
    const decode=await userService.isAuthenticated(token);
    req.userId=decode;
    next();
    }catch(error){
      ErrorResponse.error=error;
      const status=error.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR;
     return res.status(status).json(ErrorResponse); 
    }
}


async function isAdmin(req, res, next){
    const response = await userService.isAdmin(req.userId);
    if(!response){
        return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
    }
    next();
}
module.exports={
    isauthenticate,
    isAdmin
}