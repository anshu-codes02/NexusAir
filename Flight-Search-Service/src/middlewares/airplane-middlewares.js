const {StatusCodes}=require('http-status-codes');
const {errorResponse}=require('../utils/common');
const AppError=require('../utils/errors/app-error');

function validateCreateRequest(req, res, next){
    
        if(!req.body.modelNumber){
          errorResponse.message='something went wrong while creating airplane';
          errorResponse.error=new AppError(['model number not found in the request'], StatusCodes.BAD_REQUEST);

          return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
        }
        next();
}

module.exports=validateCreateRequest;