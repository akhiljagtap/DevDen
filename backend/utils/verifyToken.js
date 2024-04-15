import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return next(errorHandler(401, "Oops...Your are UNAUTHORIZED"))
    }
    jwt.verify(token, process.env.jwt_secrate_key, (err, user) => {
        if (err) {
            return next(errorHandler(402, "Something went wrong", err))
        }
        req.user = user
        next()
    })
}


