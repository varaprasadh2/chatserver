const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // will have 1 to 1 with message
      // will have 1 to 1 with channel
      // will have 1 tp 1 with user;
      //TODO: 
      Recipient.belongsTo(models.Message, { foreignKey: 'messageId'});
      Recipient.belongsTo(models.Channel, { foreignKey: "channelId" });
      Recipient.belongsTo(models.User, { foreignKey: "recipientId" });
    
    }
  };

  Recipient.init({
     id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.UUID4,
      primaryKey: true
     },
     messageId: {
       type: DataTypes.UUID,
       allowNull: false
     },
     channelId: {
       type: DataTypes.UUID,
       allowNull: false
     },
     recipientId:{
       type: DataTypes.UUID,
       allowNull: false
     },

     status: {
       type: DataTypes.INTEGER,
       allowNull: false
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
    modelName: 'Recipient',
  });
  return Recipient;
};