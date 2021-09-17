const { Sequelize } = require('sequelize');

const sequalizeInstance = new Sequelize({
    dialect: 'postgres',
    username: "postgres",
    password: "postgres",
    port: 5432,
    pool: {
        max: 10,
        idle: 30000
    }
});


const connect  = async () => {
    try{
        await sequalizeInstance.authenticate();
        console.log(`looks like database is connected!`);
    }catch(error){
        console.error(error.message);
    }
}

module.exports = {
    connect,
    sequalizeInstance
}