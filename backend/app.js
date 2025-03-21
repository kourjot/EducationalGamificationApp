import express from "express"
import {connection} from "./config/db.js"
import cors from "cors"
import "dotenv/config"
import {router} from "./routes/userRouter.js"

const app=express()

app.use(cors())
app.use(express.json())

app.use(router)

app.listen(process.env.PORT,()=>{
    connection()
    console.log(`Server is running on port http://localhost:${process.env.PORT}`)
})