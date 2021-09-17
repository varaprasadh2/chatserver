const channel_participants = require("./seed_data/channel_participants.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ChannelParticipants', channel_participants, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ChannelParticipants', null, {});
  }
};
