const AppError = require('../utils/error/app-error');
const { UserRepository, RoleRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const {auth}=require('../utils/common');
const {enums}= require('../utils/common');
const db=require('../models');
const { error } = require('../utils/common/error-response');

const userRepo = new UserRepository();
const roleRepo= new RoleRepository();

async function signUp(data) {
    const t = await db.sequelize.transaction();
    try {
        const response = await userRepo.create(data, t);
        console.log(response);
        const role=await roleRepo.getRoleByName(enums.ROLES.CUSTOMER);
        console.log(response.id);
        console.log(role.id);
        await response.addRole(role, { transaction: t });
        
        await t.commit();
        return response;
    } catch (error) {
        
        await t.rollback();

        if (error instanceof AppError) {
            throw error;
        }
        if (error.name == 'SequelizeDatabaseError') {
            const message = error.parent.sqlMessage;
            throw new AppError(message, StatusCodes.BAD_REQUEST);
        }
        if (error.name == 'TypeError') {
            throw new AppError("typeError", StatusCodes.INTERNAL_SERVER_ERROR);
        }
        if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            const message = [];
            error.errors.forEach((err) => {
                message.push(err.message);
            });
            throw new AppError(message, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create user', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function signIn(data) {
    try{
    const user = await userRepo.getUserByEmail(data.email);
    
    if (!user) {
        throw new AppError('user does not exist', StatusCodes.NOT_FOUND);
    }

    const comparePassword = bcrypt.compareSync(data.password, user.password);
    if (!comparePassword) {
        throw new AppError('password is invalid', StatusCodes.BAD_REQUEST);
    }

    const token=auth.createToken({id: user.id, email: user.email});

    return token;
}catch(error){
    console.log(error); 
    if(error instanceof AppError)
    {
        throw error;
    }

   throw new AppError('unable to login', StatusCodes.INTERNAL_SERVER_ERROR);
}
}

async function isAuthenticated(token){
    try{
       if(!token){
        throw new AppError('token is missing', StatusCodes.BAD_REQUEST);
       }

       const decoded=auth.verifyToken(token);
       const user=await userRepo.get(decoded.id);
       if(!user){
        throw new AppError('user not found', StatusCodes.NOT_FOUND);
       }

       return user.id;
    }catch(error){
       if(error instanceof AppError)
    {
        throw error;
    }
    if(error.name=='JsonWebTokenError'){
         throw new AppError('invalid token', StatusCodes.BAD_REQUEST);
    }
    if(error.name=='TokenExpiredError'){
         throw new AppError('Token expired', StatusCodes.BAD_REQUEST);
    }
    throw new AppError('unable to Authenticate', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function addRoleToUser(data){
    try{
       const user= await userRepo.get(data.userId);

       if(!user){
        throw new AppError('user not found', StatusCodes.NOT_FOUND);
       }
       const role=await roleRepo.getRoleByName(data.roleName);
       if(!role){
        throw new AppError('role not found', StatusCodes.NOT_FOUND);
       }
       await user.addRole(role);
    }catch(error){
        if(error instanceof AppError){
            return error;
        }
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isAdmin(id){
    try{
       const user=await userRepo.get(id);
       if(!user){
        throw new AppError('user not found', StatusCodes.NOT_FOUND);
       }
       const adminrole=await roleRepo.getRoleByName(enums.ROLES.ADMIN);
       return user.hasRole(adminrole);
    }catch{
       if(error instanceof AppError)
       {
        throw error;
       }

       throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



module.exports = {
    signUp,
    signIn,
    isAuthenticated,
    addRoleToUser,
    isAdmin
}