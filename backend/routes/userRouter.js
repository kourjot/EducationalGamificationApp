import {Router} from "express"
import {registerUser,login} from "../controllers/userController.js"
import {createQuiz,getQuizByIndex} from "../controllers/quizController.js"
import {tokenverify} from "../middleware/token.js"
const router=Router()

router.post('/register',registerUser)

router.post('/login',login)


router.post("/createQuiz",createQuiz)

router.get("/getQuizByIndex",tokenverify,getQuizByIndex)
export {router}