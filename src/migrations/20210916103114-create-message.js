module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      senderId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      files: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      parentId: {
        type: Sequelize.UUID,
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
    await queryInterface.dropTable('Messages');
  }
};