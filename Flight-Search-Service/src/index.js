const express=require('express');
const app=express();
const apiRoutes=require('./routes');
const {serverConfig, Logger}=require('./config');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', apiRoutes);

app.listen(serverConfig.PORT, ()=>{
    console.log(process.env.PORT)
    console.log("server is running");
});
