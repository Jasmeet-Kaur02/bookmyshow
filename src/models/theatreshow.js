"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TheatreShow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TheatreShow.hasMany(models.TheatreShowTiming, {
        foreignKey: "theatreShowId",
        as: "timings",
      });
    }
  }
  TheatreShow.init(
    {
      theatreId: DataTypes.INTEGER,
      showId: DataTypes.INTEGER,
      screenId: DataTypes.INTEGER,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "TheatreShow",
      tableName: "theatreShows",
      timestamps: false,
    }
  );
  return TheatreShow;
};
