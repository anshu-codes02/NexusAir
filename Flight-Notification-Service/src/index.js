const {serverConfig, mailConfig}=require('./config');
const express=require('express');
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.listen(serverConfig.PORT, async ()=>{
    console.log("server is running");
});

