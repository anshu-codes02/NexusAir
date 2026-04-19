const dotenv=require('dotenv');
dotenv.config();

module.exports={
    PORT: process.env.PORT,
    GMAIL: process.env.GMAIL,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD
};