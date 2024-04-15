import mongoose from "mongoose"

const commentSchema = mongoose.Schema({
    content: {
        require: true,
        type: String
    },
    postId: {
        type: String,
        require:true
    },
        

    userId: {
        type: String,
        require:true
    },
       

    likes: {
        type: Array,
        default: []
    },
    numberofLikes: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

export const Comment = mongoose.model("Comment", commentSchema)