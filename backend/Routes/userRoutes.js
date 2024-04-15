import express from "express"
import { deleteuser, getUser, getusers, signout, test, updateuser } from "../Controllers/userController.js"
import { verifyToken } from "../utils/verifyToken.js"
const router = express.Router()

router.get("/test", test)
router.post("/update/:userId", verifyToken, updateuser) // ":userID" is accessable in {req.params} 
router.delete("/delete/:userId", verifyToken, deleteuser)
router.post("/signout", signout)
router.get("/getusers", verifyToken, getusers)
router.get("/:userId", getUser)

export default router