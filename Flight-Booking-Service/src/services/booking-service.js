const { BookingRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const axios = require('axios');
const db = require('../models');
const { serverConfig } = require('../config');
const { Enums } = require('../utils/common');
const { BOOKED, CANCELLED } = Enums.BOOKING_STATUS;

const bookingrepo = new BookingRepository();

async function createBooking(data) {
    const t = await db.sequelize.transaction();
    try {
        const flight = await axios.get(`${serverConfig.FLIGHT_SERVICE_URL}/api/v1/flight/${data.flightId}`);
        const flightData = flight.data.data;
        console.log("flightData", flightData);
        if (flightData.totalSeats < data.noOfSeats) {
            throw new AppError('Not enough seats available', StatusCodes.BAD_REQUEST);
        }

        const totalAmt = flightData.price * data.noOfSeats;
        const bookingPayload = { ...data, totalCost: totalAmt };
        const result = await bookingrepo.createBooking(bookingPayload, t);

        await axios.patch(`${serverConfig.FLIGHT_SERVICE_URL}/api/v1/flight/updateSeats/${data.flightId}`, {
            seats: data.noOfSeats
        });

        await t.commit();
        return result;
    } catch (error) {
       
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

async function makePayment(data) {
    const t = await db.sequelize.transaction();
    try {
        const booking = await bookingrepo.get(data.bookingId, t);
       
        const createdAt = new Date(booking.createdAt);
        const currentTime = new Date();

        const timeDiff = (currentTime - createdAt) / (1000 * 60);

        if(timeDiff > 5){
            await cancelBooking(data.bookingId);
            throw new AppError('Booking expired', StatusCodes.BAD_REQUEST);
        }

        if (booking.totalCost != data.totalCost) {
            throw new AppError('Invalid amount', StatusCodes.BAD_REQUEST);
        }
        if (booking.userId != data.userId) {
            throw new AppError('Invalid user', StatusCodes.BAD_REQUEST);
        }
        const response = await bookingrepo.update(data.bookingId, { status: BOOKED }, t);
       
        await t.commit();
        return response;
    } catch (error) {
        if(!t.finished) await t.rollback();
            if (error instanceof AppError) {
                throw error;
            }
        throw new AppError('Payment failed', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function cancelBooking(bookingId){
    const t= await db.sequelize.transaction();
    try{
        const bookingDetails= await bookingrepo.get(bookingId, t);
        if(bookingDetails.status == CANCELLED){
         await t.commit();
         return true;
        }

        await axios.patch(`${serverConfig.FLIGHT_SERVICE_URL}/api/v1/flight/updateSeats/${bookingDetails.flightId}`, {
            seats: bookingDetails.noOfSeats,
            dec: false
        });

        await bookingrepo.update(bookingId, {status: CANCELLED}, t);
        await t.commit();
        return true;
    }catch(error){

        if(!t.finished) await t.rollback();
        throw new AppError('Cannot cancel booking', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function cancelOldBookings(){
    const t=await db.sequelize.transaction();
    try{
    const time =new Date(Date.now()-(5*60*1000));
    const response=await bookingrepo.cancelOldBookings(time);

    for(let booking of response){
        
        await axios.patch(`${serverConfig.FLIGHT_SERVICE_URL}/api/v1/flight/updateSeats/${booking.flightId}`, {
            seats: booking.noOfSeats,
            dec: false
        });
        await bookingrepo.update(booking.id, {status: CANCELLED}, t);
    }
    await t.commit();
    return response;
    }catch(error){
        if(!t.finished) await t.rollback();
        throw new AppError('Cannot cancel old bookings', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createBooking,
    makePayment,
    cancelOldBookings
};