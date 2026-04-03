'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Flight,{
        foreignKey: 'airplaneId',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });
    }
  }
  Airplane.init({
    modelNumber: {
     type: DataTypes.STRING,
     allowNull: false,
     validate:{
      isStrictlyString(val){
        if(typeof val !== 'string'){
          throw new Error('model number should be string');
        }
      }
     }
    },
    capacity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate:{
        min: {
          args: [1],
          msg: 'capacity should be greater than 0'
        },
        max: {
          args: [1000],
          msg: 'capacity should be less than 1000'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Airplane',
  });
  return Airplane;
};