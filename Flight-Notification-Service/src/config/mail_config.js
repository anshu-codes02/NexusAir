const nodemailer=require('nodemailer');
const serverConfig=require('./server-config');

const transporter= nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: serverConfig.GMAIL,
        pass: serverConfig.GMAIL_PASSWORD
    }
});

module.exports=transporter;