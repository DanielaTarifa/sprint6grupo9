'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Numbersofinstallments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numbersOfInstallment: {
        allowNull: false,
        type: Sequelize.STRING
      }
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Numbersofinstallments');
  }
};