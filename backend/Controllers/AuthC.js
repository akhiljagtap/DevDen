import { User } from "../models/userModel.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    if (username === "" || email === "" || password === "") {
        next(errorHandler(400, "all feils are required."))
    }
    try {

        const hashPassword = bcryptjs.hashSync(password, 10)

        const user = new User({
            username,
            email,
            password: hashPassword
        })
        const { password: _pass, ...rest } = user._doc

        await user.save()
        res.status(200).json(rest)

    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const signin = async (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
        next(errorHandler(400, "please enter email or password"))
    }
    try {
        const isUser = await User.findOne({ username })
        if (!isUser) {
            return next(errorHandler(402, "User not found with this username"))
        }
        const isRightPassword = bcryptjs.compareSync(password, isUser.password)
        if (!isRightPassword) {
            return next(errorHandler(403, "Username or password is incorrect"))
        }
        const { password: _pass, ...rest } = isUser._doc

        const genrateAccessToken = jwt.sign({ id: isUser._id, isAdmin: isUser.isAdmin }, process.env.jwt_secrate_key)
        res.status(200).cookie("access_token", genrateAccessToken).json(rest)
    } catch (error) {
        next(error)
        console.log(error);

    }
}

export const forgotpassword = async (req, res) => {

    const { email } = req.body
    try {
        const userEmail = await User.findOne({ email })
        if (!userEmail) {
            console.log("email not found");
        }

        else {
            const token = jwt.sign({ id: email }, process.env.jwt_secrate_key)
            res.status(200).cookie("cokkie", token).json({ message: "Email sent successfully." })
        }



        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'akhiljagtapbusiness@gmail.com',
                pass: 'novz nbkn sjyo yxip'
            }
        });


        var mailOptions = {
            from: 'akhiljagtapbusiness@gmail.com',
            to: email,
            subject: 'Your Reset Password Link.',
            text: `http://localhost:5173/resetpassword/`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    } catch (error) {
        console.log(error);

    }

}




//google Authentication




