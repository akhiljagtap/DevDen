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
            <Spinner size="xl"></Spinner>
        </div>
    )



    return (
        <div className='p-3 md:mx-auto'>
            <div className="flex-wrap flex gap-4 justify-center">
                <div className='flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md dark:bg-slate-800'>
                    <div className='flex justify-between'>
                        <div>
                            <h3 className='text-md text-gray-500 uppercase dark:text-white'>Total Users</h3>
                            <p className='text-2xl'>{totalUsers}</p>
                        </div>
                        <HiOutlineUserGroup className='bg-teal-500 text-5xl
                         text-white rounded-full p-3 shadow-lg' />
                    </div>

                </div>
                <div className='flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md dark:bg-slate-800'>
                    <div className='flex justify-between'>
                        <div>
                            <h3 className='text-md text-gray-500 uppercase dark:text-white'>Total Posts</h3>
                            <p className='text-2xl'>{totalPosts}</p>
                        </div>
                        <HiAnnotation className='bg-teal-500 text-5xl
                         text-white rounded-full p-3 shadow-lg' />
                    </div>

                </div>
                <div className='flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md dark:bg-slate-800'>
                    <div className='flex justify-between'>
                        <div>
                            <h3 className='text-md text-gray-500 uppercase dark:text-white'>Total Comments</h3>
                            <p className='text-2xl'>{totalComment}</p>
                        </div>
                        <HiDocumentText className='bg-teal-500 text-5xl
                         text-white rounded-full p-3 shadow-lg' />
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-5 p-3 mx-auto justify-center">
                <div className="flex flex-col w-full shadow-md p-2 rounded-md dark:bg-gray-800 md:w-auto">
                    <div className=" flex p-3 text-sm font-semibold justify-between ">
                        <h1 className='text-center p-3'>Recent users</h1>
                        <Button gradientDuoTone="purpleToBlue" >
                            <Link to="/dashboard?tab=users">See all</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Avtar</Table.HeadCell>
                            <Table.HeadCell>Username</Table.HeadCell>
                        </Table.Head>
                        {users && users.map((user) => (
                            <Table.Body key={user._id} className='divide-y'>
                                <Table.Row className='bg-white dark:bg-gray-800 
                                dark:border-gray-700'>
                                    <Table.Cell>
                                        <img src={user.avtar}
                                            alt='user'
                                            className='w-10 h-10 rounded-full' />
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user.username}
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}

                    </Table>
                </div>
                <div className="flex flex-col w-full shadow-md p-2 rounded-md dark:bg-gray-800 md:w-auto">
                    <div className=" flex p-3 text-sm font-semibold justify-between ">
                        <h1 className='text-center p-3'>Recent posts</h1>
                        <Button gradientDuoTone="purpleToBlue" >
                            <Link to="/dashboard?tab=posts">See all</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                        </Table.Head>
                        {posts && posts.map((post) => (
                            <Table.Body key={posts._id} className='divide-y'>
                                <Table.Row>
                                    <Table.Cell>{post.title}</Table.Cell>
                                    <Table.Cell>{post.category}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}

                    </Table>
                </div>
                <div className="flex flex-col w-full shadow-md p-2 rounded-md dark:bg-gray-800 md:w-auto">
                    <div className=" flex p-3 text-sm font-semibold justify-between ">
                        <h1 className='text-center p-3'>Recent comments</h1>
                        <Button gradientDuoTone="purpleToBlue" >
                            <Link to="/dashboard?tab=comments">See all</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Comments</Table.HeadCell>
                            <Table.HeadCell>Likes</Table.HeadCell>
                        </Table.Head>
                        {comments && comments.map((comment) => (
                            <Table.Body key={comment._id} className='divide-y'>
                                <Table.Row className='bg-white dark:bg-gray-800 
                                dark:border-gray-700'>
                                    {/* <Table.Cell>
                                        <img src={comment.avtar}
                                            alt='user'
                                            className='w-10 h-10 rounded-full' />
                                    </Table.Cell> */}
                                    <Table.Cell>
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