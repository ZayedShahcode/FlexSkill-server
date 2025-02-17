const Teams = require('../model/TeamModel')

const getDashBoard = async(req,res)=>{
    res.send("Welcome");
}

const getUserTeam = async (req, res) => {
    try {
        // const teamId = parseInt(req.params.id, 10);
        const teamId = req.params.id;
        if (!teamId) return res.status(400).json({ error: "Invalid team ID" });

        const team = await Teams.findAll({ where: { id: teamId } });

        if (team.length === 0) return res.status(404).send("Team not found");

        res.status(200).json({ team });
    } catch (err) {
        console.error("Error fetching team:", err);
        res.status(500).send("Internal Server Error");
    }
};


module.exports = {getDashBoard,getUserTeam}