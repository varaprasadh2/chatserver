module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Channels', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      displayName: {
        type: Sequelize.STRING, // generate at client side if it's direct, if its group handle @server
      },
      ownerId: {
        type: Sequelize.UUID
      },
      type: {
        type: Sequelize.INTEGER,
        defaultValue: 0 // assuming it's direct chat
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
    await queryInterface.dropTable('Channels');
  }
};