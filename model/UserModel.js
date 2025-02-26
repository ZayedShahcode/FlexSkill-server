const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    teamId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Teams', // Use the table name as a string
            key: 'id'
        },
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = User;
