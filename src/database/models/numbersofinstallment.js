'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Numbersofinstallment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Numbersofinstallment.hasMany(models.Product,{
        foreignKey:'duesId',
        as:"products"
      })
    }
  }
  Numbersofinstallment.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Numbersofinstallment',
  });
  return Numbersofinstallment;
};