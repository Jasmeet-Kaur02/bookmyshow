"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Theatre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Theatre.belongsTo(models.City, {
        foreignKey: "cityId",
      });
      Theatre.hasMany(models.Screen, {
        foreignKey: "theatreId",
      });
      Theatre.belongsToMany(models.Show, {
        through: "theatreShows",
      });
    }
  }
  Theatre.init(
    {
      name: DataTypes.STRING,
      cityId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Theatre",
      tableName: "theatres",
      timestamps: false,
    }
  );
  return Theatre;
};
