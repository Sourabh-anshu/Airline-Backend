'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Enums } = require('../utils/common');
const { BUSINESS, PREMIUM_ECONOMY, FIRST_CLASS, ECONOMY } = Enums.SEAT_TYPE;
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('Seats', 'type', {
      type: Sequelize.ENUM,
      values : [ BUSINESS, PREMIUM_ECONOMY, FIRST_CLASS, ECONOMY ],
      defaultValue : ECONOMY,
      allowNull : false,
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     */
  }
};
