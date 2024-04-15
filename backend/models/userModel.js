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
        default: "https://tse1.mm.bing.net/th?id=OIP.qezI99keP_lPLZHJv4YjEQHaHT&pid=Api&P=0&h=180"

    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},
    { timestamps: true }

)

export const User = mongoose.model("User", userSchema)