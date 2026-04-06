const {FlightRepository}=require('../repositories');
const AppError=require('../utils/errors/app-error');
const {StatusCodes}=require('http-status-codes');
const {compareDates}=require('../utils/helpers/date-time-helpers');
const {Op}=require('sequelize');

const flightRepo=new FlightRepository();

async function createFlight(data){
    try{
        if(compareDates(data.departureTime, data.arrivalTime)){
            throw new AppError('Arrival time should be greater than departure time', StatusCodes.BAD_REQUEST);
        }
        const response=await flightRepo.create(data);
        return response;
    }catch(error){
        if (error instanceof AppError) {
        throw error; 
        }

        if(error.name=='SequelizeDatabaseError'){
            const message=error.parent.sqlMessage;
            throw new AppError(message, StatusCodes.BAD_REQUEST);
        }
        if(error.name=='SequelizeValidationError'){
            const message=[];
            error.errors.forEach((err)=>{
                message.push(err.message);
            });
            throw new AppError(message, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlights(query){
    let customFilter={};
    let sortFields=[];
    if(query.trips){
        [departureAirportId, arrivalAirportId]=query.trips.split('-');
        customFilter.departureAirportId=departureAirportId;
        customFilter.arrivalAirportId=arrivalAirportId;
    }
    if(query.price){
        [minPrice, maxPrice]=query.price.split('-');
        customFilter.price={
            [Op.gte]: minPrice,
            [Op.lte]: maxPrice
        };
    }
    if(query.travellersCount){
        customFilter.totalSeats={
            [Op.gte]: query.travellersCount
        };
    }
    if(query.departureDate){
        const start=`${query.departureDate}T00:00:00.000Z`;
        const end=`${query.departureDate}T23:59:59.999Z`;
        customFilter.departureTime={
            [Op.between]: [start, end]
        };
    }
    if(query.sort){
        sortFields=query.sort.split(',').map((field)=>{
          let [Key, order]=field.trim().split('_');
            return [Key, order];
        });
        
    }
    try{
        const flights=await flightRepo.getAllFlights(customFilter, sortFields);
        return flights;
    }catch(error){
           console.log(error);
            throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



module.exports={
    createFlight,
    getFlights
}

