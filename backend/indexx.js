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
import cors from "cors";

dotenv.config() // Load env vars as early as possible

const __dirname = path.resolve()
const app = express()

// 1. CORS MUST be the first middleware
const allowedOrigins = [
  'http://localhost:5173', 
  'https://devden-frontend-j75skxbob-akhils-projects-a3c18627.vercel.app'
];
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // Required if you are sending cookies/headers
}));

// 2. Body parsers and Cookie parser
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 5000 // Changed to 5000 to match your log

mongoose.connect(process.env.mongo).then(() => {
    console.log("mongodb connected successfully.");
}).catch((err) => {
    console.log("mongodb connection failed", err);
})

// Routes
app.use("/api/isuser", testrouter)
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/post", postrouter)
app.use("/api/comment", commentrouter)
app.use("/api/feedback", feedbackRouter)

app.get("/", (req, res) => {
    res.send("API is running 🚀");
})

// Error Handler
app.use((err, req, res, next) => {
    const statuscode = err.statuscode || 500
    const message = err.message || "internal server error"
    res.status(statuscode).json({
        success: false,
        message,
        statuscode
    })
})

app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
})