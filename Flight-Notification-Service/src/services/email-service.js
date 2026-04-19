const {mailer}=require('../config');
const AppError= require('../utils/errors/app-error');
const {StatusCodes}= require('http-status-codes');
const {TicketRepository}=require('../repositories');


const ticketRepo= new TicketRepository();

async function sendEmail(mailFrom, mailTo, subject, text){
    try{
      const response= await mailer.sendMail({
        from: mailFrom,
        to: mailTo,
        subject: subject,
        text: text
      });
      return response;
    }catch(error){
        console.log(error);
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function createTicket(data){
    try {
        const response= await ticketRepo.create(data);
        return response;
    } catch (error) {
        throw new AppError('Sonething went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function getPendingTickets(){
    try {
        const response= await ticketRepo.getPendingTickets();
        return response;
    } catch (error) {
        throw new AppError('Something went Wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    sendEmail,
    createTicket,
};