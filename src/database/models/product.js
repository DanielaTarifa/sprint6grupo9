'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //BelongTo
      Product.belongsTo(models.Category,{
        foreignKey:'categoryId',
        as:"category"//include
      }),

      Product.belongsTo(models.Numbersofinstallment,{
        foreignKey:'duesId',
        as:"duesNumbers"//include
      }),

      Product.belongsTo(models.Section,{
        foreignKey:'sectionId',
        as:"section"//include
      })

    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    duesId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    img: DataTypes.STRING,
    visibility: DataTypes.BOOLEAN,
    stock: DataTypes.INTEGER,
    stockMin: DataTypes.INTEGER,
    stockMax: DataTypes.INTEGER,
    sectionId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};