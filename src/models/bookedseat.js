"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BookedSeat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BookedSeat.belongsTo(models.ShowBooking, {
        foreignKey: "bookingId",
      });
      BookedSeat.belongsTo(models.Seat, {
        foreignKey: "seatId",
      });
    }
  }
  BookedSeat.init(
    {
      bookingId: DataTypes.INTEGER,
      seatId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "BookedSeat",
      tableName: "bookedSeats",
    }
  );
  return BookedSeat;
};
