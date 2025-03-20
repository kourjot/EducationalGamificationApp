import {Leaderboard} from '../models/leaderboard.js';
const getLeaderboard = async (req, res) => {
    try {
        const topPlayers = await Leaderboard.find()
            .sort({ score: -1 })
            .limit(10)
            .populate("userId", "name"); // Fetch user name from User model
        
        res.status(200).json(topPlayers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get leaderboard" });
    }
};
export {getLeaderboard}
