"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Screen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Screen.belongsTo(models.Theatre, {
        foreignKey: "theatreId",
      });
      Screen.hasMany(models.Seat, {
        foreignKey: "screenId",
      });
    }
  }
  Screen.init(
    {
      number: DataTypes.INTEGER,
      theatreId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Screen",
      tableName: "screens",
      timestamps: false,
    }
  );
  return Screen;
};
