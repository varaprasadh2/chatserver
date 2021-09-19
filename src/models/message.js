
const { Model, DataTypes:dt } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // message will have one sender : User 
        Message.belongsTo(models.User, { foreignKey: 'senderId' });
      
    }
  };
  Message.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    files: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    parentId: {
      type: DataTypes.UUID,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }

  }, {
    sequelize,
    modelName: 'Message'
  });
  return Message;
};