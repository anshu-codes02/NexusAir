const {ErrorResponse, SuccessResponse}=require('../utils/common');
const {StatusCodes}=require('http-status-codes');
const {userService}=require('../services');

async function signUp(req, res){
   try {
       const response= await userService.signUp(req.body);
       SuccessResponse.data=response;
       return res.status(StatusCodes.CREATED).json(SuccessResponse);
   } catch (error) {
         ErrorResponse.error=error;
         const statusCode=error.statusCode?error.statusCode:StatusCodes.INTERNAL_SERVER_ERROR;
         return res.status(statusCode).json(ErrorResponse);
   }
};

async function signIn(req, res){
   try {
       const response= await userService.signIn(req.body);
       SuccessResponse.data=response;
       return res.status(StatusCodes.CREATED).json(SuccessResponse);
   } catch (error) {
         ErrorResponse.error=error;
         const statusCode=error.statusCode?error.statusCode:StatusCodes.INTERNAL_SERVER_ERROR;
         return res.status(statusCode).json(ErrorResponse);
   }
};


module.exports={
    signUp,
    signIn
}