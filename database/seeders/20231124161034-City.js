"use strict";

const cities = require("../../src/data/Cities.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "cities",
      JSON.parse(JSON.stringify(cities)),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cities", null, {});
  },
};
