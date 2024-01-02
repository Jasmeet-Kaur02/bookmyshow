"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("theatreShowTimings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      theatreShowId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "theatreShows",
          key: "id",
          as: "theatreShowId",
        },
      },
      time: {
        type: Sequelize.TIME,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("theatreShowTimings");
  },
};
