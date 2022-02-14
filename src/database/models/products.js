'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // belongsTo
      Products.belongsTo(models.Numbersofinstallments, {
        as: "duesNumbers",
        foreignKey: 'duesId'
        
      });

      Products.belongsTo(models.Categories, {
        as: "Category",
        foreignKey: 'categoryId'
        
      });

      Products.belongsTo(models.Sections, {
        as: "section",
        foreignKey: 'sectionId'
        
      });

    }
  }
  Products.init({
    pName: DataTypes.STRING,
    description: DataTypes.STRING,
    duesId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    img: DataTypes.STRING,
    visibility: DataTypes.BOOLEAN,
    stcok: DataTypes.INTEGER,
    stockMin: DataTypes.INTEGER,
    stcokMax: DataTypes.INTEGER,
    sectionId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};