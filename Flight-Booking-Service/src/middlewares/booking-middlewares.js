const AppError=require('../utils/errors/app-error');
const {StatusCodes}=require('http-status-codes');
const {ErrorResponse}=require('../utils/common');


async function validateCreateBooking(req, res, next){
    if(!req.body.flightId){
        ErrorResponse.error=new AppError('Flight ID is required', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.userId){
        ErrorResponse.error=new AppError('User ID is required', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.totalCost){
        ErrorResponse.error=new AppError('Total cost is required', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports={
    validateCreateBooking
};