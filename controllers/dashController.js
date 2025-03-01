const Teams = require('../model/TeamModel')
const User = require('../model/UserModel')

const getDashBoard = async(req,res)=>{
    res.send("Welcome");
}

const getUserTeam = async (req, res) => {
    try {
        const teamId = req.params.id;
        
        if (!teamId) return res.status(400).json({ error: "Invalid team ID" });

        const teams = await Teams.findAll({ where: { id: teamId } });

        if (!teams || teams.length === 0) {
            return res.status(404).json({ error: "Team not found" });
        }

        await Promise.all(
            teams.map(async (team) => {
                const user = await User.findByPk(team.teamLeader);
                if (user) {
                    team.teamLeader = user.username;
                }
            })
        );

        res.status(200).json({ userTeam: teams });
    } catch (err) {
        console.error("Error fetching team:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



module.exports = {getDashBoard,getUserTeam}