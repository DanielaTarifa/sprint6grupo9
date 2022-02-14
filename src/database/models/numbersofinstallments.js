'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Numbersofinstallments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      Numbersofinstallments.hasMany(models.Products, {
        as: "products",
        foreignKey: 'duesId'
        
      });
    }
  }
  Numbersofinstallments.init({
    numbersOfInstallment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Numbersofinstallments',
  });
  return Numbersofinstallments;
};