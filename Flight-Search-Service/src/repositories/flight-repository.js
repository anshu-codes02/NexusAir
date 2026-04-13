const CrudRepository=require('./crud-repository');
const {Airplane, Airport, Flight, City}=require('../models');
const {Sequelize}=require('sequelize');
const { parse } = require('dotenv');
const db=require('../models');
const {addRowLocks}=require('./queries');

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

    async updateRemainingSeats(flightId, seats, dec){
        const t=await db.sequelize.transaction();
        try{
        await db.sequelize.query(addRowLocks(flightId), {transaction: t});
        if(dec){
            await Flight.decrement('totalSeats', {by: seats, where: {id: flightId},
                transaction: t
            });
        }
        else{
            await Flight.increment('totalSeats', {by: seats, where: {id: flightId},
                transaction: t
         });
         
       }
        await t.commit();
        return true;
    }catch(error){
        await t.rollback();
        throw error;
    }
    }
};

module.exports=FlightRepository;