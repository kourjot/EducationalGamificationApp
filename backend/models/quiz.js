import {Schema,model} from "mongoose"


const QuizSchema = new Schema({
    title: { type: String, required: true },
    questions: [
        {
            questionText: { type: String, required: true },
            options: [{ type: String, required: true }],
            correctAnswer: { type: String, required: true }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

export const Quiz =model("Quiz", QuizSchema);

