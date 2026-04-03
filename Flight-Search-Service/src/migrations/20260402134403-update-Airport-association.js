'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.addConstraint('airports', {
         type: 'foreign key',
         fields: ['city_id'],
         references:{
          table: 'cities',
          field: 'id'
         },
         onUpdate: 'cascade',
         onDelete: 'cascade'
      },);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('airports', 'city_fkey_constraint');
  }
};
