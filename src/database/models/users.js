'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // belongsTo
      Users.belongsTo(models.Rols, {
        as: "rol",
        foreignKey: 'rolId'
        
      });

    }
  }
  Users.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    cel: DataTypes.INTEGER,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    rolId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};