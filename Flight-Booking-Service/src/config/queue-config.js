const amqplib=require('amqplib');
const serverConfig=require('./server-config');
let connection, channel;

async function connectQueue(){
    try{
         connection= await amqplib.connect('amqp://localhost');
         channel= await connection.createChannel();

        await channel.assertQueue(serverConfig.QUEUE);
    }catch(error){
        console.log(error);
    }
}

function sendData(data){
    try{
        channel.sendToQueue(serverConfig.QUEUE, Buffer.from(JSON.stringify(data)));
    }catch(error){
       console.log(error);
    }
}

module.exports={
    connectQueue,
    sendData
};