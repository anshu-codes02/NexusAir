const {StatusCodes}=require('http-status-codes');
const {airplaneService}=require('../services');
const {errorResponse, successResponse}=require('../utils/common');



async function createAirplane(req, res){
    try{
        
      const airplane= await airplaneService.createAirplane({
        modelNumber: req.body.modelNumber,
        capacity: req.body.capacity
      });

        successResponse.data=airplane;
      return res.status(StatusCodes.OK).json(successResponse);

    }catch(error){
        errorResponse.error=error;
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
         res.status(statusCode).json(errorResponse);
    }
}

async function getAllAirplanes(req, res){
    try{
      const airplanes= await airplaneService.getAllAirplanes();
      successResponse.data=airplanes;
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
async function getAirplane(req, res){
    try{
      const airplane= await airplaneService.getAirplane(req.params.id);
      successResponse.data=airplane;
      return res.status(StatusCodes.OK).json(successResponse);
    }catch(error){
      errorResponse.error=error;
      const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
       return res.status(statusCode).json(errorResponse);
    }};

async function destroyAirplane(req, res){
    try{
      const airplane= await airplaneService.destroyAirplane(req.params.id);
      successResponse.data=airplane;
      return res.status(StatusCodes.OK).json(successResponse);
    }catch(error){
      errorResponse.error=error;
      const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
       return res.status(statusCode).json(errorResponse);
    }};

    async function updateAirplane(req, res){
      try{
         const response= await airplaneService.updateAirplane(req.params.id, req.body);
         successResponse.data=response;
         return res.status(StatusCodes.OK).json(successResponse);
      }catch(err){
         errorResponse.error=err;
         const statusCode=err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
         return res.status(statusCode).json(errorResponse); 
      }
    }


module.exports={
    createAirplane,
    getAllAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
};




