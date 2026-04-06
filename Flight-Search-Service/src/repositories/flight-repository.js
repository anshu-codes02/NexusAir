const CrudRepository=require('./crud-repository');
const {Airplane, Airport, Flight, City}=require('../models');
const {Sequelize}=require('sequelize');

class FlightRepository extends CrudRepository{

    constructor(){
        super(Flight);
    };

    async getAllFlights(filter, order){
        const response=await Flight.findAll({
            where: filter,
            order: order,
            include: [{
                model: Airplane,
            },
            {
            model: Airport,
            as: 'departureAirport',
            on: {
                col1: Sequelize.where(Sequelize.col('Flight.departureAirportId'), '=', Sequelize.col('departureAirport.code'))
            },
            include:{
                model: City,
                required: true
            }
        },
        {
            model: Airport,
            as: 'arrivalAirport',
            on: {
                col1: Sequelize.where(Sequelize.col('Flight.arrivalAirportId'), '=', Sequelize.col('arrivalAirport.code'))
            },
            include:{
                model: City,
                required: true
            }
        },
        ]
        });
        return response;
    }

};

module.exports=FlightRepository;