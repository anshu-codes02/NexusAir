const AppError= require('../utils/errors/app-error');
const {StatusCodes}= require('http-status-codes');
const {errorResponse, successResponse}=require('../utils/common');
const {mailService}=require('../services');

async function sendEmail(req, res){
    try{
       const response=await mailService.sendEmail();
       successResponse.data=response;
       return res.status(StatusCodes.ACCEPTED).json(successResponse);
    }catch(error){
        errorResponse.error=error;
       const statusCode=error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
       return res.status(statusCode).json(errorResponse);
    }
};

async function createTicket(req, res){
    try{
       const response=await mailService.createTicket(req.body);
       successResponse.data=response;
       return res.status(StatusCodes.CREATED).json(successResponse);
    }catch(error){
        errorResponse.error=error;
       const statusCode=error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
       return res.status(statusCode).json(errorResponse);
    }
};

module.exports={
    sendEmail,
    createTicket
};