const { BookingRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const axios = require('axios');
const db = require('../models');
const { serverConfig } = require('../config');

const bookingrepo = new BookingRepository();

async function createBooking(data) {
    const t = await db.sequelize.transaction();
    try {
        const flight = await axios.get(`${serverConfig.FLIGHT_SERVICE_URL}/api/v1/flight/${data.flightId}`);
        const flightData = flight.data.data;
        if (flightData.totalSeats < data.noOfSeats) {
            throw new AppError('Not enough seats available', StatusCodes.BAD_REQUEST);
        }

        const totalAmt = flightData.price * data.noOfSeats;
        const bookingPayload = { ...data, totalCost: totalAmt };
        const result = await bookingrepo.createBooking(bookingPayload, t);
       
        await axios.patch(`${serverConfig.FLIGHT_SERVICE_URL}/api/v1/flight/updateSeats/${data.flightId}`,{
             seats: data.noOfSeats
        });
        
        await t.commit();
        return result;
    } catch (error) {
        console.log(error);
        await t.rollback();
        if (error instanceof AppError) {
            throw error;
        }
        if (error.name == 'SequelizeDatabaseError') {
            const message = error.parent.sqlMessage;
            throw new AppError(message, StatusCodes.BAD_REQUEST);
        }
        if (error.name == 'TypeError') {
            throw new AppError("typeError", StatusCodes.INTERNAL_SERVER_ERROR);
        }
        if (error.name == 'SequelizeValidationError') {
            const message = [];
            error.errors.forEach((err) => {
                message.push(err.message);
            });
            throw new AppError(message, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create booking', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

module.exports = {
    createBooking
};