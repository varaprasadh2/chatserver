const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  };
  
  Channel.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    displayName: {
      type:DataTypes.STRING, // generate at client side if it's direct, if its group handle @server
    },
    ownerId: {
      type: DataTypes.UUID
    },
    lastActiveOn: {
      type: DataTypes.DATE
    },
    type: {
      type: DataTypes.INTEGER,
      defaultValue: 0 // assuming it's direct chat
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
    modelName: 'Channel',
  });
  return Channel;
};