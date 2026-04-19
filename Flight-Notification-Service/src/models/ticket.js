'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ticket.init({
    subject: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
      allowNullL: false
    },
    recepientEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['PENDING', 'SUCCESS', 'FAILURE'],
      allowNull: false,
      defaultValue: 'PENDING'
    }
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};