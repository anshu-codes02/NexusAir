const mailService=require('../services/email-service');
const serverConfig=require('./server-config');
const amqplib=require('amqplib');

async function connectQueue(){
    try{
       const connection= await amqplib.connect('amqp://localhost');
        const channel= await connection.createChannel();

        await channel.assertQueue('noti-queue');
        channel.consume('noti-queue', async (data)=>{
            const obj=JSON.parse(data.content.toString());
            await mailService.sendEmail(
                `Booking ${serverConfig.GMAIL}`,
                 obj.recepientEmail,
                 obj.subject, 
                 obj.text
                 );
            channel.ack(data);
        });
    }catch(error){
        console.log(error);
    }
}

module.exports={
    connectQueue
};