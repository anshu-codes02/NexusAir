const express=require('express');
const app=express();
const apiRoutes=require('./routes');
const {serverConfig, Logger}=require('./config');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', apiRoutes);

app.listen(serverConfig.PORT, async ()=>{
    console.log("server is running");
    // const {City, Airport}=require('./models');
    // const city=await City.findByPk(2);
    // const val=await city.createAirport({
    //     name: 'Indira Gandhi International Airport',
    //     code: 'DEL',
    //     address: 'New Delhi, India'
    // });

    // const data=await city.getAirports();
    // const data2=await Airport.findByPk(1);
    // await city.removeAirport(data2);

    /* so when we remove the airport, it will not be deleted from the database, 
    but the association will be removed. city_id will be null 
    so if in constraints of city_id we have allowNull: false, then it will throw an error,
    */
    // console.log(data2);

});
