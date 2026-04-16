const jwt=require('jsonwebtoken');
const {serverConfig}=require('../../config');

 function createToken(data){
  try {
     return jwt.sign(data, serverConfig.JWT_SECRET,{expiresIn: serverConfig.EXPIRY});     
  } catch (error) {
    throw error;
  }
};

function verifyToken(token){
    try {
        return jwt.verify(token, serverConfig.JWT_SECRET);
    } catch (error) {
        throw error;
    }
}
module.exports={
    createToken,
    verifyToken
}