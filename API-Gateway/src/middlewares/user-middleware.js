const {ErrorResponse}=require('../utils/common');
const {StatusCodes}=require('http-status-codes');
const AppError = require('../utils/error/app-error');

async function validateSignUp(req, res, next){
    if(!req.body.email)
    {
        //ErrorResponse.message='Email not found in the request';
        ErrorResponse.error=new AppError('Email not found in the request', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.password)
    {
        //ErrorResponse.message='Password not found in the request';
        ErrorResponse.error=new AppError('Password not found in the request', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports={
    validateSignUp
}