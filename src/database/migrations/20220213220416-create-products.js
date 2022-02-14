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
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      duesId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'numbersofinstallments',
          key: 'id'
        }
      },
      price: {
        type: Sequelize.INTEGER
      },
      img: {
        type: Sequelize.STRING
      },
      visibility: {
        type: Sequelize.BOOLEAN
      },
      stcok: {
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