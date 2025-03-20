import {Quiz } from "../models/quiz.js"
import { Leaderboard } from "../models/leaderboard.js";
import jwt from "jsonwebtoken"

import "dotenv/config"
import mongoose from "mongoose"
const createQuiz=async(req,res)=>{
    try{
        const {title,questions}=req.body
        const quiz=new Quiz({title,questions})
        await quiz.save()
        res.status(201).json({ message: "Quiz created successfully!", quiz: quiz });
    }catch(err){
        console.error(err)
        res.status(500).json({ error: "Failed to create quiz" });
    }
}
const  getQuizByIndex=async(req,res)=>{
    try{
       
        const {index}=req.query
        const quizIdx=Number(index)
        console.log(quizIdx)
        if(isNaN(quizIdx) ||quizIdx<0){
            return res.status(400).json({ message: "Invalid quiz index" });
        }

        const quizData = await Quiz.find()
        console.log(quizData.length)
        if (quizIdx >= quizData.length) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        let quiz =quizData[quizIdx]
        console.log(quiz)
        res.status(200).json({question: quiz});
    }catch(err){
        console.error(err)
        res.status(500).json({ error: "Failed to get all quizzes" });
    }
}
const submitQuiz = async (req, res) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Token is required" });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const { name, userId } = decodedToken;
        const { quizId,selectedOption } = req.body;
        const quiz=await Quiz.findById(quizId)
        if(!quiz){
            return res.status(404).json({ message: "Quiz not found" });
        }
        let scores=0
        if(quiz.correctAnswer===selectedOption){
            scores=5
        }
        const updatedLeaderboard=await Leaderboard.    findOneAndUpdate(
            { userId },
            { 
                $inc: { score: scores }, 
                $setOnInsert: { userId, name: name} 
            },
            { new: true, upsert: true }
        );
        res.status(200).json({
            message: scores > 0 ? "Correct! Score updated." : "Wrong answer!",
            updatedLeaderboard,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to submit quiz" });
    }
};

export {createQuiz,getQuizByIndex,submitQuiz}