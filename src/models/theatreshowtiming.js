"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TheatreShowTiming extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TheatreShowTiming.belongsTo(models.TheatreShow, {
        foreignKey: "theatreShowId",
      });
      TheatreShowTiming.hasMany(models.ShowBooking, {
        foreignKey: "theatreShowTimingId",
      });
    }
  }
  TheatreShowTiming.init(
    {
      theatreShowId: DataTypes.INTEGER,
      time: DataTypes.TIME,
    },
    {
      sequelize,
      modelName: "TheatreShowTiming",
      tableName: "theatreShowTimings",
      timestamps: false,
    }
  );
  return TheatreShowTiming;
};
