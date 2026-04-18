const { StatusCodes } = require('http-status-codes');
const AppError=require('../utils/error/app-error');
const db=require('../models');
class crudRepository {

    constructor(model){
        this.model=model;
    }
    
    async create(data, t){
            const response= await this.model.create(data,{
                transaction: t
            });
            return response;
    };

    async destroy(data){
            const response= await this.model.destroy({
                where: {
                    id: data
                }
            });

            if(response==0){
                throw new AppError('Not found', StatusCodes.NOT_FOUND);
            }

            return response;
    };

    async get(data){
       
            const response= await this.model.findByPk(data);
            if(!response){
                throw new AppError('Not found', StatusCodes.NOT_FOUND);
            }

            return response;
    };

    async getAll(){
        console.log('inside repo');
            const response= await this.model.findAll();
            return response;
    };

     async update(data, id){
            const response= await this.model.update(data, {where: {
                id: id
            }
        });

         if(response==0){
                throw new AppError('Not found', StatusCodes.NOT_FOUND);
            }
            return response;
    };


};

module.exports=crudRepository;