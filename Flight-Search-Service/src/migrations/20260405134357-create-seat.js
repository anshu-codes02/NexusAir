'use strict';

const { Enums} = require('../utils/common');
const { ECONOMY, BUSINESS, FIRST_CLASS, PREMIUM_ECONOMY } = Enums.SEAT_TYPE;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'airplanes',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      row: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      col: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM,
        values: [ECONOMY, BUSINESS, FIRST_CLASS, PREMIUM_ECONOMY],
        defaultValue: ECONOMY,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Seats');
  }
};