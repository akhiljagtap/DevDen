import { Button, Table, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiAnnotation } from 'react-icons/hi'
import { HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi2'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'




function DashbordComp() {
    const [users, setUsers] = useState([])
    const [comments, setcomments] = useState([])
    const [posts, setposts] = useState([])
    const [totalUsers, settotalUsers] = useState(0)
    const [totalComment, settotalComments] = useState(0)
    const [totalPosts, settotalPosts] = useState(0)
    const [loading, setloading] = useState(false)
    const { currentUser } = useSelector((state) => state.user)

    useEffect(() => {
        const fetchUsers = async () => {
            setloading(true)
            try {
                const res = await fetch("/api/user/getusers?limit=5")
                const data = await res.json()
                if (res.ok) {
                    setloading(false)
                    setUsers(data.users)
                    settotalUsers(data.totalUsers)
                }

            } catch (error) {
                setloading(false)
                console.log(error);

            }

        }
        const fetchPosts = async () => {
            try {
                setloading(true)
                const res = await fetch("/api/post/getposts?limit=5")
                const data = await res.json()
                if (res.ok) {
                    setloading(false)
                    setposts(data.posts)
                    settotalPosts(data.totalPosts)
                }


            } catch (error) {
                setloading(false)
                console.log(error);

            }
        }
        const fetchComments = async () => {
            try {
                setloading(true)
                const res = await fetch("/api/comment/getadmincomment?limit=5")
                const data = await res.json()
                if (res.ok) {
                    setloading(false)
                    setcomments(data.comments)
                    settotalComments(data.totalComment)
                }


            } catch (error) {
                setloading(false)
                console.log(error);

            }

        }
        if (currentUser.isAdmin) {
            fetchComments()
            fetchPosts()
            fetchUsers()
        }


    }, [currentUser])

    if (loading) return (
        <div className='flex justify-center items-center min-h-screen mx-auto'>
            <Spinner size="lg"></Spinner>
        </div>
    )



    return (



        <div className='p-3 md:mx-auto mt-12 ml-16  '>
            <div className="flex-wrap flex gap-4 justify-center ">
                <div className="flex flex-col p-3 gap-4 ml-auto md:w-72  max-w-64 min-w-60  rounded-md shadow-md dark:bg-slate-950">
                    <div className="flex justify-between bg-bgcolor p-2 ">
                        <div className="flex flex-col justify-center items-center w-full">
                            <h3 className="text-md uppercase text-white text-center">Total users</h3>
                            <p className="text-xl mt-1 text-gray-300 text-center">{totalUsers}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col p-3 gap-4 md:w-72 ml-auto max-w-64 min-w-60 rounded-md shadow-md dark:bg-slate-950">
                    <div className="flex justify-between bg-bgcolor p-2">
                        <div className="flex flex-col justify-center items-center w-full">
                            <h3 className="text-md uppercase text-white text-center">Total posts</h3>
                            <p className="text-xl mt-1 text-gray-300 text-center">{totalPosts}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col p-3 gap-4 md:w-72 ml-auto  max-w-64 min-w-60 rounded-md shadow-md ">
                    <div className="flex justify-between bg-bgcolor p-2">
                        <div className="flex flex-col justify-center items-center w-full">
                            <h3 className="text-md uppercase text-white text-center">Total comments</h3>
                            <p className="text-xl mt-1 text-gray-300 text-center">{totalComment}</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="flex flex-wrap gap-5 p-3 mx-auto justify-center">
                <div className="flex flex-col , max-w-96 min-w-72 shadow-md p-2 rounded-md md:w-auto">
                    <div className=" flex p-3 text-sm font-semibold justify-between ">
                        <h1 className='text-center p-3 text-white  font-semibold'>Recent users</h1>
                        <button  >
                            <Link className='text-green-400 font-semibold underline hover:opacity-90
                            font-sans' to="/dashboard?tab=users">View more</Link>
                        </button>
                    </div>
                    <Table >
                        <Table.Head>
                            <Table.HeadCell  >Avtar</Table.HeadCell>
                            <Table.HeadCell >Username</Table.HeadCell>
                        </Table.Head >
                        {users && users.map((user) => (
                            <Table.Body key={user._id} className='divide-y hover:bg-bg5 bg-bg4'>
                                <Table.Row className=' dark:bg-slate-900 
                                dark:border-gray-700'>
                                    <Table.Cell>
                                        <img src={user.avtar}

                                            alt='user'
                                            className='w-10 h-10 rounded-full' />
                                    </Table.Cell>
                                    <Table.Cell className='text-sm text-white '>
                                        {user.username}
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}

                    </Table>
                </div>
                <div className="flex flex-col max-w-80 shadow-md p-2 rounded-md dark:bg-gray-950 md:w-auto">
                    <div className="flex flex-col items-center">
                        <div className="flex p-3 text-sm font-semibold justify-between w-full">
                            <h1 className='text-center p-3 font-semibold text-white'>Recent posts</h1>
                            <button>
                                <Link className='text-green-400 font-semibold underline hover:opacity-90 font-sans' to="/dashboard?tab=posts">View more</Link>
                            </button>
                        </div>
                        <Table className="w-full">
                            <Table.Head>
                                <Table.HeadCell>Title</Table.HeadCell>
                                <Table.HeadCell>Category</Table.HeadCell>
                            </Table.Head>
                            {posts && posts.map((post) => (
                                <Table.Body key={post._id} className='divide-y bg-slate-900 hover:bg-bg bg-bg4'>
                                    <Table.Row>
                                        <Table.Cell className='text-white font-semibold text-sm'>{post.title}</Table.Cell>
                                        <Table.Cell>{post.category}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            ))}
                        </Table>
                    </div>
                </div>
                <div className="flex flex-col max-w-64 min-w-56 shadow-md p-2 rounded-md  md:w-auto">
                    <div className=" flex p-3 text-sm font-semibold justify-between ">
                        <h1 className='text-center p-3 text-white'>Recent comments</h1>
                        <button className='text-green-400 font-semibold underline
                            font-sans hover:opacity-90' >
                            <Link to="/dashboard?tab=comments">View more</Link>
                        </button>
                    </div>
                    <Table >
                        <Table.Head>
                            <Table.HeadCell >Comments</Table.HeadCell>
                            <Table.HeadCell >Likes</Table.HeadCell>
                        </Table.Head>
                        {comments && comments.map((comment) => (
                            <Table.Body key={comment._id} className='divide-y bg-slate-900 hover:bg-bg5 bg-bg4  '>
                                <Table.Row className=' dark:bg-slate-900 
                                dark:border-gray-700'>
                                    {/* <Table.Cell>
                                        <img src={comment.avtar}
                                            alt='user'
                                            className='w-10 h-10 rounded-full' />
                                    </Table.Cell> */}
                                    <Table.Cell className='font-semibold text-white'>
                                        {comment.content}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {comment.numberofLikes}
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}

                    </Table>
                </div>
            </div>
        </div>


    )
}

export default DashbordComp