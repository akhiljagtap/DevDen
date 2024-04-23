import Mongoose from "mongoose";

const postSchema = Mongoose.Schema({
    userId: {
        type: String,

    },
    title: {
        require: true,
        unique: true,
        type: String
    },
    content: {
        unique: true,
        type: String,
        require: true
    },
    image: {
        type: String,
        default: "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png"
    },
    category: {
        default: "uncategorized",
        type: String,
    },
    slug: {
        type: String,
        unique: true,
        require: true

    }
}, { timestamps: true })

export const Post = Mongoose.model("Post", postSchema)