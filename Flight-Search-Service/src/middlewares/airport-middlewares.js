const {StatusCodes}=require('http-status-codes');
const {errorResponse}=require('../utils/common');
const AppError=require('../utils/errors/app-error');


function validateCreateRequest(req,res,next){
    const {name, code, city_id}=req.body;
    if(!name || !code || !city_id){
        errorResponse.error = new AppError(['Missing mandatory fields'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    next();
}

function validateUpdateRequest(req,res,next){
    if(!req.body){
        errorResponse.error = new AppError(['Missing data to update'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    next();
}

module.exports={
    validateCreateRequest,
    validateUpdateRequest
};
