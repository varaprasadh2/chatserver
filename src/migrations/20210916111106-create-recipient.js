module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Recipients', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID4,
        primaryKey: true
      },
      messageId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      channelId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      recipientId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    await queryInterface.dropTable('Recipients');
  }
};