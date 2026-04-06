const {errorResponse, successResponse}=require('../utils/common');
const {flightService}=require('../services');
const { StatusCodes } = require('http-status-codes');

async function createFlight(req, res){
    try{
      const flight=await flightService.createFlight({
        flightNumber: req.body.flightNumber,
        airplaneId: req.body.airplaneId,
        departureAirportId: req.body.departureAirportId,
        arrivalAirportId: req.body.arrivalAirportId,
        arrivalTime: req.body.arrivalTime,
        departureTime: req.body.departureTime,
        price: req.body.price,
        boardingGate: req.body.boardingGate,
        totalSeats: req.body.totalSeats
      });

      successResponse.data=flight;
        return res.status(StatusCodes.OK).json(successResponse);
    }catch(error){
        errorResponse.message=error.message;
        errorResponse.error=error;
        const statusCode=error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json(errorResponse);
    }
}

async function getFlights(req, res){
    try{
        const flights=await flightService.getFlights(req.query);
        successResponse.data=flights;
        return res.status(StatusCodes.OK).json(successResponse);
    }catch(error){
        errorResponse.error=error;
        const statusCode=error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json(errorResponse);
    }
}


module.exports={
    createFlight,
    getFlights
}