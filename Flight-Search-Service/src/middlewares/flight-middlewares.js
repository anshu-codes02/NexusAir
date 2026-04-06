const AppError=require('../utils/errors/app-error');
const {StatusCodes}=require('http-status-codes');
const {errorResponse}=require('../utils/common');


async function validateCreateFlight(req, res, next){
    if(!req.body.flightNumber){
        errorResponse.error=new AppError('Flight number not found', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    if(!req.body.airplaneId){
        errorResponse.error=new AppError('Airplane id not found', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    if(!req.body.departureAirportId){
        errorResponse.error=new AppError('Departure airport id not found', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    if(!req.body.arrivalAirportId){
        errorResponse.error=new AppError('Arrival airport id not found', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    if(!req.body.arrivalTime){
        errorResponse.error=new AppError('Arrival time not found', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    if(!req.body.departureTime){
        errorResponse.error=new AppError('Departure time not found', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    if(!req.body.price){
        errorResponse.error=new AppError('Price not found', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    if(!req.body.totalSeats){
        errorResponse.error=new AppError('Total seats not found', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }
    next();
}

module.exports={
    validateCreateFlight
}