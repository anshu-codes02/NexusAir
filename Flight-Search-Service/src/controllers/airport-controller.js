const {errorResponse, successResponse} = require('../utils/common');
const {airportService} = require('../services');
const { StatusCodes } = require('http-status-codes');

async function createAirport(req, res){
    try{
        const airport = await airportService.createAirport(req.body);
        successResponse.data = airport;
        return res.status(StatusCodes.OK).json(successResponse);
    }catch(error){
        errorResponse.error=error;
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json(errorResponse);
    }
};

async function getAirport(req, res){
    try{
        const airport = await airportService.getAirport(req.params.id);
        successResponse.data = airport;
        return res.status(StatusCodes.OK).json(successResponse);
    }catch(error){
        errorResponse.error=error;
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
         return res.status(statusCode).json(errorResponse);
    }
};

async function getAllAirports(req, res){
    try{
        console.log('inside get all airports controller');
        const airports = await airportService.getAllAirports();
        successResponse.data = airports;
        return res.status(StatusCodes.OK).json(successResponse);
    }catch(error){
        errorResponse.error=error;
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
         return res.status(statusCode).json(errorResponse);
    }
};

async function destroyAirport(req, res){
    try{
        const response = await airportService.destroyAirport(req.params.id);
        successResponse.data = response;
        return res.status(StatusCodes.OK).json(successResponse);
    }catch(error){
        errorResponse.error=error;
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
         return res.status(statusCode).json(errorResponse);
    }
};

async function updateAirport(req, res){
    try{
        const response = await airportService.updateAirport(req.params.id, req.body);
        successResponse.data = response;
        return res.status(StatusCodes.OK).json(successResponse);
    }catch(error){
        errorResponse.error=error;
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
         return res.status(statusCode).json(errorResponse);
    }
};

module.exports={
    createAirport,
    getAirport,
    getAllAirports,
    destroyAirport,
    updateAirport
};