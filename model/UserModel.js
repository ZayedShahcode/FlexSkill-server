const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')
const Team = require('./TeamModel')

const User = sequelize.define('User',{
    username : {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true  
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    //foreign key
    teamId: {
        type: DataTypes.INTEGER,
        references: {
            model: Team,
            key: 'id'
        },
        allowNull: true 
    }
},{
    timestamps:true
});

// Relationships
User.belongsTo(Team,{foreignKey:'teamId',onDelete:'SET NULL'})
Team.hasMany(User,{foreignKey:'teamId'})


module.exports = User;