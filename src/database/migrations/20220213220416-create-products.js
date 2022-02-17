'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      duesId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'numbersofinstallments',
          key: 'id'
        }
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      img: {
        allowNull: false,
        type: Sequelize.STRING
      },
      visibility: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      stcok: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      stockMin: {
        type: Sequelize.INTEGER
      },
      stcokMax: {
        type: Sequelize.INTEGER
      },
      sectionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'sections',
          key: 'id'
        }
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
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
    await queryInterface.dropTable('Products');
  }
};