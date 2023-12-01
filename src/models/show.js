"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Show extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Show.belongsToMany(models.Theatre, {
        through: "theatreShows",
      });
      Show.hasMany(models.TheatreShow, {
        foreignKey: "showId",
      });
    }
  }
  Show.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Show",
      tableName: "shows",
      timestamps: false,
    }
  );
  return Show;
};
