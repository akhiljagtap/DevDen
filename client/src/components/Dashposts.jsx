import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { Button, Modal, Table, Spinner } from "flowbite-react"
import { Link } from "react-router-dom"
import { HiOutlineExclamationCircle } from 'react-icons/hi2'


function Dashposts() {
    const [userposts, setUserPosts] = useState([])
    const [showMore, setshowMore] = useState(true)
    const [showModal, setshowModal] = useState(false)
    const [postIdToDelete, setpostIdToDelete] = useState('')
    const [Loading, setLoading] = useState(false)
    const { currentUser, loading } = useSelector((state) => state.user)

    // console.log(userposts);

    useEffect(() => {
        const fetchpost = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
                const data = await res.json()
                if (res.ok) {
                    setLoading(false)
                    setUserPosts(data.posts)
                    if (data.posts.length < 8) {
                        setshowMore(false)
                    }
                }

            } catch (error) {
                setLoading(false)
                console.log(error.messag);

            }
        }
        if (currentUser.isAdmin) {
            fetchpost()

        }
    }, [currentUser._id])




    const handleShowMore = async () => {
        setLoading(true)
        const startIndex = userposts.length
        try {
            const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
            const data = await res.json()
            if (res.ok) {
                setLoading(false)
                setUserPosts((prev) => [...prev, ...data.posts])
                if (data.posts.length < 8) {
                    setshowMore(false)
                }
            }


        } catch (error) {
            setLoading(false)
            console.log(error);

        }

    }

    const handleDeletePost = async () => {
        setshowModal(false)
        try {

            const res = await fetch(`/api/post/deleteposts/${postIdToDelete}/${currentUser._id}`, {
                method: "DELETE"
            })
            const data = await res.json()
            if (!res.ok) {

                console.log(data.messag);
            } else {
                setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete))
            }




        } catch (error) {

            console.log(error.messag);

        }

    }
    // if (Loading) return (
    //     <div className='flex justify-center items-center min-h-screen mx-auto'>
    //         <Spinner size="xl"></Spinner>
    //     </div>
    // )


    return (
        <div className='table-auto p-3 md:mx-auto '>
            {currentUser.isAdmin && userposts.length > 0 ? (

                <Table hoverable className='shadow-md '>
                    <Table.Head>
                        <Table.HeadCell>Updated date</Table.HeadCell>
                        <Table.HeadCell>Image</Table.HeadCell>
                        <Table.HeadCell>Title </Table.HeadCell>
                        <Table.HeadCell> Category</Table.HeadCell>
                        <Table.HeadCell>Delete</Table.HeadCell>
                        <Table.HeadCell>
                            <span>Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <>
                        {
                            userposts.map((post) => {
                                return (
                                    <Table.Body className='divide-y'>
                                        <Table.Row className='font-medium bg-white dark:bg-gray-900'>
                                            <Table.Cell className='font-medium'>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>

                                            <Table.Cell>
                                                <Link to={`/post/${post.slug}`}>
                                                    <img src={post.image} alt={post.title}
                                                        className='w-20 h-12 bg-gray-400' />
                                                </Link>
                                            </Table.Cell>
                                            <Table.Cell className='dark:text-white'>
                                                <Link to={`/post/${post.slug}`}>
                                                    <p className='dark:text-white'>{post.title}</p>
                                                </Link>
                                            </Table.Cell>
                                            <Table.Cell>{post.category}</Table.Cell>
                                            <Table.Cell>
                                                <span onClick={() => {
                                                    setshowModal(true);
                                                    setpostIdToDelete(post._id)
                                                }} className='text-red-500 hover:underline 
                                                cursor-pointer font-medium'>Delete</span>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Link to={`/updatepost/${post._id}`}>
                                                    <span className='dark:text-white hover:underline '>Edit</span>
                                                </Link>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>

                                )
                            })
                        }
                    </>
                    {
                        showMore && <button onClick={handleShowMore} className='w-full p-3 self-center text-blue-600  text-sm'>Show more</button>
                    }

                </Table>



            ) : (<p>You have no post yet!</p>)
            }
            <Modal show={showModal} onClose={() => setshowModal(false)} popup size="md" >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <h3 className='font-semibold '>Delete post</h3>

                        {/* <HiOutlineExclamationCircle className='h-12 w-12 text-gray-400 mb-4 mx-auto' /> */}
                        <h3 className='text-md mb-4 text-gray-700'>Delete your post permanently?</h3>
                        <div className='flex justify-between gap-4'>
                            <Button color="transperant" className='text-blue-600 hover:bg-blue-200'
                                onClick={handleDeletePost}>Yes</Button>
                            <Button onClick={() => setshowModal(false)} color="transperant"
                                className='text-blue-600 hover:bg-blue-200' pill>cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


        </div >
    )
}
export default Dashposts










