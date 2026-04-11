const express=require('express');
const app=express();
const {serverConfig}=require('./config');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api', require('./routes'));

app.listen(serverConfig.PORT,()=>{
    console.log("server running on port", serverConfig.PORT);
});