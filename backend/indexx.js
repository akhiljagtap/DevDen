import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRouter from "./Routes/userRoutes.js"
import authRouter from "./Routes/authR.js"
import testrouter from "./Routes/testRoute.js"
import postrouter from "./Routes/postRoute.js"
import commentrouter from "./Routes/comment.Route.js"
import path from "path"
import feedbackRouter from "./Routes/feedBackRoute.js"

const __dirname = path.resolve()
const app = express()

dotenv.config()


mongoose.connect(process.env.mongo).then(() => {
    console.log("mongodb connected successfully.");
}).catch((err) => {
    console.log("mongodb connection failed", err);
})

app.get("/jsut", (req, res) => {
    res.json("this is just test route")
})

app.use(express.json())
app.use(cookieParser())

// "mongodb+srv://stack:stack@cluster0.csyo6iy.mongodb.net/"



app.use("/api/isuser", testrouter)
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/post", postrouter)
app.use("/api/comment", commentrouter)
app.use("/api/feedback", feedbackRouter)

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})








app.use((err, req, res, next) => {
    const statuscode = err.statuscode || 500
    const message = err.message || "internal server error"
    res.status(statuscode).json({
        success: false,
        message,
        statuscode
    })

})

app.listen(5000, () => {
    console.log("server is listining on 5000");
})