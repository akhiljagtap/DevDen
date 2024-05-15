import express from "express"
import { feedback } from "../Controllers/feebbackController.js";
const router = express.Router()

router.post("/feedbackmsg", feedback)

export default router;
