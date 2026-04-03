const {StatusCodes}=require('http-status-codes');
const {errorResponse}=require('../utils/common');
const AppError=require('../utils/errors/app-error');

function validateCreateRequest(req, res, next){
    
        if(!req.body.name){
          errorResponse.message='something went wrong';
          errorResponse.error=new AppError(['name not found in the request'], StatusCodes.BAD_REQUEST);

          return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
        }
        next();
}


function validateUpdate(req, res, next){
   if(!req.body)
   {
     errorResponse.error=new AppError(['no data in request'], StatusCodes.BAD_REQUEST);
     return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
   }

   next();
}

module.exports={
    validateCreateRequest,
    validateUpdate
}
