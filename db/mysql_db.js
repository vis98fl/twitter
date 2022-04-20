const Sequelize = require('sequelize');
const DB_HOSTNAME = 'localhost'
const DB_USERNAME = 'root'
const DB_PASSWORD = 'Qwerty@98!'
const DB_NAME = 'twitter_db'

const sequelize = new Sequelize(DB_NAME,DB_USERNAME,DB_PASSWORD,{
    host:DB_HOSTNAME,
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
});

sequelize.authenticate().then(() =>{
    console.log("Connection successful");
}).catch((err)=>{
    console.log('Error in connecting Database',err);
})

module.exports = sequelize;