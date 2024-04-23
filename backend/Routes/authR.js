import express from "express"
import { forgotpassword, signin, signup } from "../Controllers/AuthC.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/forgotpassword", forgotpassword)


export default router