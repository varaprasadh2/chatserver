const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ChannelParticipants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ChannelParticipants.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.UUID4,
      primaryKey: true
    },
    channelId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    userId:{
      type: DataTypes.UUID,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1 // 1-> active, 0-> inactive for now
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
    modelName: 'ChannelParticipants',
  });
  return ChannelParticipants;
};