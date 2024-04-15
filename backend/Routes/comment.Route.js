import express from "express"
import { verifyToken } from "../utils/verifyToken.js"
import {
    createComment,
    deletecomment,
    getadmincomment,
    getcomments,
    likecomment
} from "../Controllers/commentController.js"

const router = express.Router()

router.post("/create", verifyToken, createComment)
router.get("/getcomments/:postId", getcomments) //this postId is accessible as "params"//
router.get("/getadmincomment", verifyToken, getadmincomment)
router.put("/likecomment/:commentId", verifyToken, likecomment)
router.delete("/deletecomment/:commentId", verifyToken, deletecomment)

export default router