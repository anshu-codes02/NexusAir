const crudRepository = require("./crud-repository");
const {Booking}=require('../models');

class bookingRepository extends crudRepository{
      constructor(){
        super(Booking);
      }

      async createBooking(data, transaction){
   const response= await this.model.create(data, {transaction: transaction});
   return response;
}
}



module.exports=bookingRepository;