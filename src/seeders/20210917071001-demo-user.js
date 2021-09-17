const users = require("./seed_data/users.json");


module.exports = {
  up: async (queryInterface, Sequelize) => {
     try{
       await queryInterface.bulkInsert('Users', users);
     }catch(err){
       console.log(err);
     }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null , {});
  }
};
