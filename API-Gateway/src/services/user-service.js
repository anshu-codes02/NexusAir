const AppError = require('../utils/error/app-error');
const {UserRepository}=require('../repositories');
const {StatusCodes}=require('http-status-codes');

const userRepo=new UserRepository();

async function signUp(data){
    try{
         const response= await userRepo.create(data);
         return response;
    }catch(error){
        if (error instanceof AppError) {
            throw error;
        }
        if (error.name == 'SequelizeDatabaseError') {
            const message = error.parent.sqlMessage;
            throw new AppError(message, StatusCodes.BAD_REQUEST);
        }
        if (error.name == 'TypeError') {
            throw new AppError("typeError", StatusCodes.INTERNAL_SERVER_ERROR);
        }
        if (error.name == 'SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError') {
            const message = [];
            error.errors.forEach((err) => {
                message.push(err.message);
            });
            throw new AppError(message, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create user', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    signUp
}