const {BookingService}=require('../services');
const {StatusCodes}=require('http-status-codes');
const {SuccessResponse, ErrorResponse}=require('../utils/common');

async function createBooking(req, res){
    try{
       const data=await BookingService.createBooking(req.body);
       SuccessResponse.data=data;
       SuccessResponse.message="Successfully created a booking";
       return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }catch(error){
        const statusCode=error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        ErrorResponse.error=error;
        return res.status(statusCode).json(ErrorResponse);
    }
};

module.exports={
    createBooking
};