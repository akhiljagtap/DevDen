import React, { useEffect, useState } from 'react'
import moment from "moment"
// import { FaThumbsUp } from 'react-icons/fa'
import { AiOutlineLike } from "react-icons/ai";
import { useSelector } from 'react-redux'
import { FaThumbsUp } from 'react-icons/fa';


function Comment({ comment, onLike, onDelete }) {
    const [User, setUser] = useState({})
    const [loading, setloading] = useState(false)
    const { currentUser } = useSelector(state => state.user)
    // console.log(User);
    useEffect(() => {
        const getUser = async () => {
            try {
                setloading(true)
                const res = await fetch(`/api/user/${comment.userId}`)
                const data = await res.json()
                if (res.ok) {
                    setloading(false)
                    setUser(data)
                }

            } catch (error) {
                setloading(false)
                console.log(error.message);

            }
        }
        getUser()


    }, [comment])
    return (
        <div className='flex p-4 border-b '>
            <div className='flex-shrink-0 mr-3'>
                <img className='w-10 h-10 bg-gray-200 rounded-full' src={User.avtar} alt={User.username} />
            </div>
            <div className='flex-1'>
                <div className='flex items-center mb-1'>
                    <span className='font-bold text-xs mr-1 truncate '>
                        {User ? `@${User.username}` : "anonymous user"}</span>
                    <span className='text-xs text-gray-500 '>{moment(comment.
                        createdAt).fromNow()}</span>
                </div>
                <p className='text-sm text-gray-500 mb-2'>{comment.content}</p>
                <div className='flex gap-2 text-sm border-t  border-gray-300 pt-2
                 dark:border-gray-600 items-center '>
                    <button type='button' className={`text-sm text-gray-400 hover:text-gray-500
                    dark:text-gray-300 ${currentUser &&
                        comment.likes.includes(currentUser._id) && '!text-blue-500'}`}
                        onClick={() => onLike(comment._id)}><FaThumbsUp className='text-lg' /></button>
                    <p className=' text-gray-400'>
                        {comment.numberofLikes > 0 && comment.numberofLikes + " " +
                            (comment.numberofLikes === 1 ? "like" : "likes")}
                    </p>
                    <button type='button' className='text-red-600 dark:text-red-600'
                        onClick={() => onDelete(comment._id)} >Delete</button>
                </div>
            </div>

        </div>
    )
}

export default Comment