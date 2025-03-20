import {Router} from "express"
import {registerUser,login} from "../controllers/userController.js"
import {createQuiz,getQuizByIndex,submitQuiz} from "../controllers/quizController.js"
import {tokenverify} from "../middleware/token.js"
import {getLeaderboard} from  "../controllers/leaderboardController.js"

const router=Router()

router.post('/register',registerUser)

router.post('/login',login)


router.post("/createQuiz",createQuiz)

router.get("/getQuizByIndex",tokenverify,getQuizByIndex)

router.post("/submitQuiz",tokenverify,submitQuiz)
router.get("/getLeaderboard",tokenverify,getLeaderboard)
export {router}