'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Arm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Player, {
        foreignKey: 'id',
      }); 
  }
  // para ver más fácil impactos
  getCoordinates() {
    // Retorna las coordenadas del cohete como un objeto { x, y }
    return {
      x: this.x,
      y: this.y
    };
  }
}
  Arm.init({
    name: DataTypes.STRING,
    damage: DataTypes.INTEGER,
    playerId: DataTypes.INTEGER,
    hit: DataTypes.INTEGER,
    x: DataTypes.INTEGER,
    y: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Arm',
  });
  return Arm;
};