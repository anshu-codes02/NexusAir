const {StatusCodes}=require('http-status-codes');
const {CityRepository}=require('../repositories');
const AppError = require('../utils/errors/app-error');

const cityrepo=new CityRepository();

async function createCity(data){
    try{
       const response=await cityrepo.create(data);
       return response;
    }catch(error){
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
};

async function getAllCities(){
    try{
        const response=await cityrepo.getAll();
        return response;
    } catch(err){
        throw new AppError('Unable to fetch data', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function getCity(id){
    try{
        const response=await cityrepo.get(id);
        return response;
    } catch(err){
        if(err.statusCode==StatusCodes.NOT_FOUND)
        {
            throw new AppError('id not exist',err.statusCode);
        }
        throw new AppError('Unable to fetch data', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function destroyCity(id){
    try{
       const response= await cityrepo.destroy(id);
       return response;
    }catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw error;
        }
        throw new AppError('Unable to destroy data', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createCity,
    getAllCities,
    getCity,
    destroyCity
}