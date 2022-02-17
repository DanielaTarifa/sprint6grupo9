'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cel: {
        type: Sequelize.INTEGER
      },
      uPassword: {
        allowNull: false,
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      rolId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'rols',
          key: 'id'
        }
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
    await queryInterface.dropTable('Users');
  }
};