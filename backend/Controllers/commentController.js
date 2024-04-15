
import { Comment } from "../models/commentModal.js"
import { errorHandler } from "../utils/error.js"

export const createComment = async (req, res, next) => {
    const { content, postId, userId } = req.body
    try {
        if (userId !== req.user.id) {
            next(errorHandler(400, "You are not allow to create this comment."))
        }

        const newComment = new Comment({
            postId,
            userId,
            content
        })
        await newComment.save()
        res.status(200).json(newComment)



    } catch (error) {
        next(error)
    }

}

export const getcomments = async (req, res, next) => {
    try {
        const comment = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 })
        res.status(200).json(comment)

    } catch (error) {
        next(error)

    }

}

export const getadmincomment = async (req, res, next) => {
    if (!req.user.isAdmin) {
        next(errorHandler(402, "You are not allowed to view all comments."))
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0
        const limit = parseInt(req.query.limit) || 9
        const sortDirection = req.query.sort === "asc" ? 1 : -1

        const comments = await Comment.find()
            .sort({ createdAt: sortDirection }).skip(startIndex).limit(limit)

        const totalComment = await Comment.countDocuments()
        res.status(200).json({
            comments,
            totalComment
        })

    } catch (error) {
        next(error)

    }

}

export const likecomment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        if (!comment) {
            next(errorHandler(401, "No comment found!"))
        }
        const userIndex = comment.likes.indexOf(req.user.id)
        if (userIndex === -1) {
            comment.numberofLikes += 1
            comment.likes.push(req.user.id)
        }
        else {
            comment.numberofLikes -= 1
            comment.likes.splice(userIndex, 1)
        }
        await comment.save()
        res.status(200).json(comment)

    } catch (error) {
        next(error)

    }

}

export const deletecomment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        if (!comment) {
            next(errorHandler(402, "No comment found!"))
        }
        if (comment.userId !== req.user.id && !req.user.isAdmin) {
            next(errorHandler(403, "You are not allow to delete this comment"))
        }
        await Comment.findByIdAndDelete(req.params.commentId)
        res.status(200).json("Comment has been deleted.")


    } catch (error) {
        next(error)

    }

}