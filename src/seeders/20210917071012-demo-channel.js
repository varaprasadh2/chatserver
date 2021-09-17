const channels = require("./seed_data/channels.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Channels', channels);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Channels', null, {});
  }
};
