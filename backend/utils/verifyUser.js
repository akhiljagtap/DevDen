import jwt from "jsonwebtoken"
import { errorHandler } from "./error.js"

export const verifyToken = async (req, res, next) => {
    const token = req.cookie.access_token
    if (!token) {
        next(errorHandler(401, "Unauthorized user found."))
    }
    jwt.verify(token, process.env.jwt_secrate_key, (err, user) => {
        if (err) {
            next(errorHandler("Unauthorized"))
        }
        req.user = user
        next()
    })

}