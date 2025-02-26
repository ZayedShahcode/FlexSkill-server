const Team = require('./TeamModel');
const User = require('./UserModel');


User.belongsTo(Team, { foreignKey: 'teamId', onDelete: 'SET NULL' });
Team.belongsTo(User, { as: 'leader', foreignKey: 'teamLeader' });
Team.hasMany(User, { foreignKey: 'teamId' });

module.exports = { User, Team };
