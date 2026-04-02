const {errorResponse, successResponse}=require('../utils/common');
const {cityService}=require('../services');
const { StatusCodes } = require('http-status-codes');

async function createCity(req, res){
    try{
      const response= await cityService.createCity(req.body);
      successResponse.data=response;
      return res.status(StatusCodes.OK).json(successResponse);
    }catch(error){
        errorResponse.error=error;
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
         res.status(statusCode).json(errorResponse); 
    }
};

async function getAllCities(req, res){
    try{
      const cities= await cityService.getAllCities();
      successResponse.data=cities;
      return res.status(StatusCodes.OK).json(successResponse);
    }catch(error){
      errorResponse.error=error;
      const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
       return res.status(statusCode).json(errorResponse);
    }};

    /** 
    * GET : /airplanes/:id
    * req body : {}
    **/
async function getCity(req, res){
    try{
      const city= await cityService.getCity(req.params.id);
      successResponse.data=city;
      return res.status(StatusCodes.OK).json(successResponse);
    }catch(error){
      errorResponse.error=error;
      const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
       return res.status(statusCode).json(errorResponse);
    }};
async function destroyCity(req, res){
    try{
        const response= await cityService.destroyCity(req.params.id);
        successResponse.data=response;
        return res.status(StatusCodes.OK).json(successResponse);
    }catch(error){
        errorResponse.error=error;
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json(errorResponse);
    }
}

module.exports={
    createCity,
    getAllCities,
    getCity,
    destroyCity
}