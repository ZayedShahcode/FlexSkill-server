const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Team = sequelize.define('Team', {
    teamname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    teamDescription: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    teamLeader: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users', // Ensure this matches your actual User table name
            key: 'id'
        }
    },
    githubLink: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    },
    teamsize: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2
    },
    members: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), 
        defaultValue: []
    },
    numberOfPeople: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    timestamps: true
});


Team.prototype.addMember = async function (userId) {
    
    if (this.numberOfPeople > this.teamsize) {
        throw new Error("Cannot add more members. The team is already full");
    }

    if (this.members.includes(userId)) {
        throw new Error("User is already part of the team");
    }

    this.members = [...this.members, userId]; // ✅ Push the new user into the array
    this.numberOfPeople += 1;
    await this.save(); 
};

Team.prototype.removeMember = async function (userId) {
    if (!this.members.includes(userId)) {
        throw new Error("User is not a member of the team.");
    }

    this.members = this.members.filter(id => id !== userId); // ✅ Assign the new filtered array
    this.numberOfPeople -= 1;
    await this.save(); 
};

module.exports = Team;
