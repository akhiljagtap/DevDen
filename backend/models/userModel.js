import mongoose from "mongoose"


const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,

    },
    email: {
        require: true,
        unique: true,
        type: String,
    },
    password: {
        require: true,
        type: String,
    },
    avtar: {
        type: String,
        default: "https://yourteachingmentor.com/wp-content/uploads/2020/12/istockphoto-1223671392-612x612-1.jpg"

    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }

)

export const User = mongoose.model("User", userSchema)