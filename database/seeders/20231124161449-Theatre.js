"use strict";

const theatres = require("../../src/data/Theatres.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "theatres",
      JSON.parse(JSON.stringify(theatres)),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("theatres", null, {});
  },
};
