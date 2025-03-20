import {Schema,model} from "mongoose"
const leaderboardSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required: true, unique: true 
    },
    score: { type: Number, required: true, default: 0 },
},{ timestamps: true })

const Leaderboard = model("Leaderboard", leaderboardSchema)

export {Leaderboard}