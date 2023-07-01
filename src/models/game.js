'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Player, {
        foreignKey: 'id',
      });
      this.hasMany(models.Board, {
        foreignKey: 'id',
      });
    }
  }
  Game.init({
    turn: DataTypes.INTEGER,
    currentDuration: DataTypes.FLOAT,
    winner: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};