'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Game, {
        foreignKey: 'id',
      });
      this.hasOne(models.Board, {
        foreignKey: 'id',
      });
      this.hasMany(models.Arm, {
        foreignKey: 'id',
      });
      this.hasMany(models.Rocket, {
        foreignKey: 'id',
      });
    }
  }
  Player.init({
    username:{
       type:DataTypes.STRING,
       validate: {
      isAlphanumeric: {
        msg: ' Username must be alphanumeric'
      }
    },
  },
    password: {type:DataTypes.STRING,
      validate:{
      isValidPassword(value) {
        if (value.length < 6 || !value.match(/[0-9]/) || !value.match(/[a-zA-Z]/) || !value.match(/[!@#$%^&*]/)){
          throw new Error('Password must contain one number, one letter and one special character, and be at least 6 characters');
        }
      }
    },  
  },
    mail: {type:DataTypes.STRING,
      validate: {
      isEmail: {
        msg: 'Email must be valid'
    }
    },  
  },
    gameId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};
