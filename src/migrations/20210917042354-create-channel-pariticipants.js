'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ChannelParticipants', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID4,
        primaryKey: true
      },
      channelId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ChannelParticipants');
  }
};