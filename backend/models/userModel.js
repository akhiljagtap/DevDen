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
        default: "https://tse2.mm.bing.net/th?id=OIP.OlnxO753VRgHKDLLDzCKoAHaHw&pid=Api&P=0&h=180"

    },

    isAdmin: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }

)

export const User = mongoose.model("User", userSchema)