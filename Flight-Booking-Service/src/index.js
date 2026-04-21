const express=require('express');
const app=express();
const {serverConfig, queueConfig}=require('./config');
const {CRONS}=require('./utils/common');


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api', require('./routes'));

app.listen(serverConfig.PORT, async()=>{
    console.log("server running on port", serverConfig.PORT);
    CRONS();
    await queueConfig.connectQueue();
    console.log('connected queue');
});