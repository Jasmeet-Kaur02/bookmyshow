"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("theatreShows", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      theatreId: {
        onDelete: "CASCADE",
        type: Sequelize.INTEGER,
        references: {
          model: "theatres",
          key: "id",
          as: "theatreId",
        },
      },
      showId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "shows",
          key: "id",
          as: "showId",
        },
      },
      screenId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "screens",
          key: "id",
          as: "screenId",
        },
      },
      date: {
        type: Sequelize.DATEONLY,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("theatreShows");
  },
};
