import { User } from "../models/userModel.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"

export const test = async (req, res) => {
    res.json("this is test route akhil....")
}

export const updateuser = async (req, res, next) => {
    // console.log(req.user);
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(400, "You are not allow to  update this user."))
    }
    if (req.body.password) {
        if (req.body.password.length < 5) {
            return next(errorHandler(400, "Password is too short. (min 6 char required.)"))
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }
    if (req.body.username) {
        if (req.body.username.length < 3) {
            return next(errorHandler(400, "Username contain at least 3 char."))
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, "Username must be in lowercase."))
        }
        if (req.body.username.includes(" ")) {
            return next(errorHandler(400, "Spcing is not allowed in username."))
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                avtar: req.body.avtar
            }
        }, { new: true })
        const { password, ...rest } = updatedUser._doc
        res.status(200).json(rest)

    } catch (error) {
        next(error)

    }
}

export const deleteuser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
        return next(errorHandler(402, "Sorry you are not able to delete this account."))
    }
    try {
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json({ message: "user deleted successfully." })

    } catch (error) {
        next(error)

    }
}

export const signout = async (req, res) => {
    try {
        res.clearCookie("access_token").status(200).json("user has been signed out.")

    } catch (error) {
        console.log(error);

    }

}

export const getusers = async (req, res, next) => {
    if (!req.user.isAdmin) {
        next(errorHandler("You are not allow to VIEW user"))
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0
        const limit = parseInt(req.query.limit) || 9
        const sortDirection = req.query.sort === "asc" ? 1 : -1

        const users = await User.find()
            .sort({ createdAt: sortDirection }).skip(startIndex).limit(limit)

        const userWithoutPassword = users.map((user) => {
            const { password, ...rest } = user._doc
            return rest
        })
        const totalUsers = await User.countDocuments()
        res.status(200).json({
            users: userWithoutPassword,
            totalUsers
        })

    } catch (error) {
        next(error)


    }

}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId)
        if (!user) {
            return next(errorHandler("No user found!"))
        }
        const { password, ...rest } = user._doc
        res.status(200).json(rest)

    } catch (error) {
        next(error)

    }
}





