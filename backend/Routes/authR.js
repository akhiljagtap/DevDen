import express from "express"
import { forgotpassword, resetpassword, signin, signup } from "../Controllers/AuthC.js"
import { verifyToken } from "../utils/verifyToken.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/forgotpassword", forgotpassword)
router.post("/resetpassword/:id/:token", resetpassword)



export default router