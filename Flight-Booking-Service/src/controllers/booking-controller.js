const {BookingService}=require('../services');
const {StatusCodes}=require('http-status-codes');
const {SuccessResponse, ErrorResponse}=require('../utils/common');

let inMemoryStore=new Map();

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

async function makePayment(req, res){
    try{
        const idempotentKey=req.headers['x-idempotent-key'];
            if(inMemoryStore.has(idempotentKey)){
              ErrorResponse.message="request already processed";
              return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
            }

        const data=await BookingService.makePayment({
            bookingId: req.body.bookingId,
            totalCost: req.body.totalCost,
            userId: req.body.userId
        }, req.headers['x-user-email']);

        SuccessResponse.data=data;
        SuccessResponse.message="Payment successful";
        inMemoryStore.set(idempotentKey, true);
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        console.log(error);
        const statusCode=error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        ErrorResponse.error=error;
        return res.status(statusCode).json(ErrorResponse);
    }
}

module.exports={
    createBooking,
    makePayment
};