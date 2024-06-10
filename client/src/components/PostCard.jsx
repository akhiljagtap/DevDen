import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function PostCard({ post }) {
    console.log(post.slug)
    console.log(post.title)

    return (
        <div className='group relative overflow-hidden w-full border h-[400px] rounded-lg
         sm:w-[430px] border-teal-500 hover:border-2 transition-all'>
            <Link to={`/post/${post.slug}`}>

                <img src={post.image} className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all
                duration-200 z-20' />
            </Link>

            <div className='flex flex-col gap-2 p-3 text-white'>
                <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
                <span className='text-sm italic'>{post.category}</span>
                <Link to={`/post/${post.slug}`} className='z-10 group-hover:bottom-0 absolute bottom-[-200px]
                left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500
                 duration-200 text-center hover:text-white transition-all py-2 rounded-md !rounded-tl'>
                    <button>Read article</button>
                </Link>
            </div>
        </div>

    )
}

export default PostCard