const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const Team = sequelize.define('Team',{
    teamname: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    teamsize: {
        type: DataTypes.INTEGER,
        allowNull:false,
        validate:{
            min:1
        }
    }
},{
    timestamps:true
});

module.exports = Team;