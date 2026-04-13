const crudRepository = require("./crud-repository");
const { Booking } = require('../models');
const { Op } = require("sequelize");
const {Enums} = require('../utils/common');
const {CANCELLED, BOOKED} = Enums.BOOKING_STATUS;

class bookingRepository extends crudRepository {
  constructor() {
    super(Booking);
  }

  async createBooking(data, transaction) {
    const response = await Booking.create(data, { transaction: transaction });
    return response;
  }
  async get(id, transaction) {
    const response = await this.model.findByPk(id, { transaction: transaction });
    if (!response) {
      throw new AppError('Booking not found', StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async update(id, data, transaction) {
    const response = await Booking.update(data, {
      where: {
        id: id
      }, transaction: transaction
    });
     console.log("response", response);
    return response;
  }

  async cancelOldBookings(timestamp){
    const response =await Booking.findAll({
      where:{
        [Op.and]: [
          {
        createdAt: {
        [Op.lt]: timestamp
      },
    },
      {
        status:{
          [Op.notIn]: [CANCELLED, BOOKED]
        }
      }
    ]
    }
    });
    return response;
}

}



module.exports = bookingRepository;