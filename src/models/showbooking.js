"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShowBooking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ShowBooking.belongsTo(models.TheatreShowTiming, {
        foreignKey: "theatreShowTimingId",
      });
      ShowBooking.hasMany(models.BookedSeat, {
        foreignKey: "bookingId",
      });
      ShowBooking.belongsToMany(models.Seat, {
        through: "bookedSeats",
        foreignKey: "bookingId",
        otherKey: "seatId",
      });
    }
  }
  ShowBooking.init(
    {
      userId: DataTypes.INTEGER,
      theatreShowTimingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ShowBooking",
      tableName: "showBookings",
    }
  );
  return ShowBooking;
};
