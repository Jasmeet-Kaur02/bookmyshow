"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Seat.belongsTo(models.Screen, {
        foreignKey: "screenId",
      });
      Seat.belongsToMany(models.ShowBooking, {
        through: "bookedSeats",
        foreignKey: "seatId",
        otherKey: "bookingId",
      });
      Seat.hasMany(models.BookedSeat, {
        foreignKey: "seatId",
      });
    }
  }
  Seat.init(
    {
      number: DataTypes.INTEGER,
      screenId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Seat",
      tableName: "seats",
      timestamps: false,
    }
  );
  return Seat;
};
