import {Quiz } from "../models/quiz.js"
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
export {createQuiz,getQuizByIndex}