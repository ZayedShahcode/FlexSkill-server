const sequelize = require('./database')
const User = require('../model/UserModel')
const Team = require('../model/TeamModel')

require('../model/associations')

//Sync function

const syncDatabase = ()=>{
    sequelize.sync({ alter: true }) // Use { force: true } only in development to reset DB
    .then(() => console.log('Database Synced Successfully'))
    .catch((err) => console.error('Error Syncing Database:', err));
}

module.exports = syncDatabase