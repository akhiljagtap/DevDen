import mongoose from "mongoose";

const feebBack = new mongoose.Schema({
    feedback: {
        type: String,
    },


}, { timestamps: true })

export const Feedback = mongoose.model("Feedback", feebBack)