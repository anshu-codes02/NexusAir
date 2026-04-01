const {Airplane}=require('../models');
const crudRepository=require('./crud-repository');

class AirplaneRepository extends crudRepository{

    constructor(){
        super(Airplane);
    };

};

module.exports=AirplaneRepository;