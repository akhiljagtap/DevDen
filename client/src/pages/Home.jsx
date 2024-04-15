import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PostCard from "../components/PostCard"
import { Spinner } from 'flowbite-react'
function Home() {
  const [posts, setPost] = useState([])
  const [loading, setloading] = useState(false)
  useEffect(() => {

    try {
      const fetchPost = async () => {
        setloading(true)
        const res = await fetch("/api/post/getposts")
        if (res.ok) {
          const data = await res.json()
          setloading(false)
          setPost(data.posts)
        }
      }
      fetchPost()

    } catch (error) {
      setloading(false)
      console.log(error.message);

    }

  }, [])


  if (loading) return (
    <div className='flex justify-center items-center min-h-screen'>
      <Spinner size="xl"></Spinner>
    </div>
  )

  return (
    <div>
      <div className='flex flex-col gap-3 p-28 px-3-3 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to Akhil's blog.</h1>
        <p className='text-gray-500 sm:text-xs '>Here you will find various type of articles related to web developement.</p>
        <Link to={"/search"} className='text-xs text-teal-500 font-bold hover:underline'>View all posts
        </Link>
      </div>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='font-semibold text-center text-2xl'>Recent posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard post={post} key={post._id} />
              ))}
            </div>
            <Link to={"/search"} className='text-sm font-semibold text-teal-500'>View all posts</Link>
          </div>
        )}
      </div>

    </div>
  )
}

export default Home