const { StatusCodes } = require('http-status-codes');
const {AirplaneRepository}=require('../repositories');
const AppError = require('../utils/errors/app-error');
const { message } = require('../utils/common/error-response');

const airplanerepo=new AirplaneRepository();


async function createAirplane(data){
    try {
        const response=await airplanerepo.create(data);
        return response;
    } catch (error) {
        
        if(error.name=='SequelizeDatabaseError'){
            const message=error.parent.sqlMessage;
            throw new AppError(message, StatusCodes.BAD_REQUEST);
        }
         if(error.name=='TypeError'){
            throw new AppError("typeError", StatusCodes.INTERNAL_SERVER_ERROR);
        }
        if(error.name=='SequelizeValidationError'){
            const message=[];
            error.errors.forEach((err)=>{
                message.push(err.message);
            });
            throw new AppError(message, StatusCodes.BAD_REQUEST);
        }
        throw error;
    }
}

async function getAllAirplanes(){
    try{
        const response=await airplanerepo.getAll();
        return response;
    } catch(err){
        throw new AppError('Unable to fetch data', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports={
    createAirplane,
    getAllAirplanes
}