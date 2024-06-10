import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PostCard from "../components/PostCard"
import { Spinner } from 'flowbite-react'
import "../App.css"
function Home() {
  const [posts, setPost] = useState([])
  const [loading, setloading] = useState(false)
  const [showblur, setshowblur] = useState(false)
  useEffect(() => {
    setshowblur(true)

    const timeout = setTimeout(() => {
      setshowblur(false)

    }, 500);

    // window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

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
      <Spinner size="lg" ></Spinner>
    </div>
  )

  return (
    <div className='bg-black  text-white'>
      <div className='flex flex-col gap-3 p-28 px-3-3 max-w-6xl mx-auto'>
        <h1 className={`whitespace-nowrap font-semibold transition-blur-left  duration-blur-left
         ${showblur ? 'blur-4 translate-x-full' : 'blur-0 translate-x-0'}
         tracking-tighter md:text-3xl lg:text-7xl sm:text-sm filter: blur(4px);
         transition: filter 0.5s ease-in-out leading-tight `}>Begin Your Journey Here.</h1>



        {/* <p className={`transition-blur duration-blur ${showblur ? 'blur-4' : 'blur-0'}`}>
          This text will animate with blur on mount.
        </p> */}

        <h4 className='dark:text-white  font-medium tracking-widest uppercase mt-3'
        >Where code meets creativity, explore
          <Link to={"/search"} className='ml-2 text-lg  text-green-500 font-medium underline hover:opacity-85 mt-1
           lowercase tracking-tight leading-tight  '
          >innovative articles here.</Link>
        </h4>

        {/* <Link to={"/search"} className='text-xs text-teal-500 font-bold hover:underline mt-1'>View all posts
        </Link> */}
      </div>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7 '>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            {/* <h2 className='font-semibold text-center text-2xl'></h2> */}
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard post={post} key={post._id} />
              ))}
            </div>
            <Link to={"/search"} className='text-sm font-semibold dark:text-green-400 underline 
            tracking-tight text-blue-700 hover:underline'>View all posts</Link>
          </div>
        )}
      </div>

    </div>
  )
}

export default Home