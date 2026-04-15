const {ErrorResponse}=require('../utils/common');
const {StatusCodes}=require('http-status-codes');

async function validateSignUp(req, res, next){
    if(!req.body.email)
    {
        ErrorResponse.message='Email not found in the request';
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.password)
    {
        ErrorResponse.message='Password not found in the request';
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports={
    validateSignUp
}