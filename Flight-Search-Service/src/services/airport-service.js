const {AirportRepository} = require('../repositories');
const {AppError} = require('../utils/errors/app-error');
const {StatusCodes} = require('http-status-codes');

const airportRepo=new AirportRepository();

async function createAirport(data){
    try{
        const response= await airportRepo.create(data);
        return response;
    }catch(error){
        console.log(error);
          if(error.name=='SequelizeDatabaseError'){
            const message=error.parent.sqlMessage;
            throw new AppError(message, StatusCodes.BAD_REQUEST);
        }
         if(error.name=='TypeError'){
            throw new AppError("typeError", StatusCodes.INTERNAL_SERVER_ERROR);
        }
        if(error.name=='SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError'){
            const message=[];
            error.errors.forEach((err)=>{
                message.push(err.message);
            });
            throw new AppError(message, StatusCodes.BAD_REQUEST);
        }
        throw new AppError(['Something went wrong'], StatusCodes.INTERNAL_SERVER_ERROR);
  
    }
}

async function getAirport(id){
    try{
        const response=await airportRepo.get(id);
        return response;
    } catch(err){
        if(err.statusCode==StatusCodes.NOT_FOUND)
        {
            throw new AppError('id not exist',err.statusCode);
        }
        throw new AppError('Unable to fetch data', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function getAllAirports(){
    try{
        console.log('inside service');
        const response=await airportRepo.getAll();
        console.log(response);
        return response;
    } catch(err){
        console.log(err);
        throw new AppError('Unable to fetch data', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function destroyAirport(id){
    try{
        const response=await airportRepo.destroy(id);
        return response;
    } catch(err){
        if(err.statusCode==StatusCodes.NOT_FOUND)
        {
            throw err;
        }
        throw new AppError('Unable to destroy data', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function updateAirport(id, data){
    try{
         const response= await airportRepo.update(data, id);
         return response;
    } catch(err){
          if(err.statusCode==StatusCodes.NOT_FOUND)
        {
            throw err;
        }
        throw new AppError('Unable to destroy data', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

module.exports={
    createAirport,
    getAirport,
    getAllAirports,
    destroyAirport,
    updateAirport
}