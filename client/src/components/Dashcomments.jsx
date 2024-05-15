import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { Table, Spinner } from "flowbite-react"



function DashComments() {
    const [comments, setComments] = useState([])
    const [showMore, setshowMore] = useState(true)
    const [commentIdToDelete, setcommentIdToDelete] = useState('')
    const [Loading, setLoading] = useState(false)
    const { currentUser, loading } = useSelector((state) => state.user)

    // console.log(users);
    // console.log(userIdToDelete);

    // console.log(userposts);
    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/comment/getadmincomment`)
                const data = await res.json()
                if (res.ok) {
                    setLoading(false)
                    setComments(data.comments)
                    if (data.comments.length < 9) {
                        setshowMore(false)
                    }
                }

            } catch (error) {
                setLoading(false)
                console.log(error.message);

            }
        }
        if (currentUser.isAdmin) {
            fetchComments()

        }
    }, [currentUser._id])




    const handleShowMore = async () => {
        const startIndex = comments.length
        try {
            setLoading(true)
            const res = await fetch(`/api/comment/getadmincomment?startIndex=${startIndex}`)
            const data = await res.json()
            if (res.ok) {
                setLoading(false)
                setComments((prev) => [...prev, ...data.comments])
                if (data.comments.length < 9) {
                    setshowMore(false)
                }
            }


        } catch (error) {
            setLoading(false)
            console.log(error);

        }
    }
    // const handleDeleteComment = async () => {
    //     try {
    //         const res = await fetch(`/api/comment/delete/${commentIdToDelete}`, {
    //             method: "DELETE"
    //         })
    //         const data = await res.json()
    //         if (!res.ok) {
    //             console.log(data.message);
    //         } else {
    //             setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete))
    //             setshowModal(false)

    //         }


    //     } catch (error) {
    //         console.log(error.message);

    //     }

    // }

    // if (Loading) return (
    //     <div className='flex justify-center items-center min-h-screen mx-auto'>
    //         <Spinner size="xl"></Spinner>
    //     </div>
    // )







    return (
        <div className='table-auto p-3 md:mx-auto mt-16 '>
            {currentUser.isAdmin && comments.length > 0 ? (

                <Table hoverable className='shadow-md'>
                    <Table.Head>
                        <Table.HeadCell>Date Updated</Table.HeadCell>
                        <Table.HeadCell className='text-white'>Commnets</Table.HeadCell>
                        <Table.HeadCell>No of likes </Table.HeadCell>
                        <Table.HeadCell> PostId</Table.HeadCell>
                        <Table.HeadCell>UserId</Table.HeadCell>
                        {/* <Table.HeadCell>Delete</Table.HeadCell> */}

                    </Table.Head>
                    <>
                        {
                            comments.map((comment) => {
                                return (
                                    <Table.Body className='divide-y bg-slate-900'>
                                        <Table.Row className='font-medium  dark:bg-gray-950'>
                                            <Table.Cell className='font-medium text-gray-500'>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>


                                            <Table.Cell>
                                                <p className='text-white'>{comment.content}</p>
                                            </Table.Cell>


                                            <Table.Cell>
                                                <p className='dark:text-white'>{comment.numberofLikes}</p>
                                            </Table.Cell>

                                            <Table.Cell>{comment.postId}</Table.Cell>
                                            <Table.Cell>{comment.userId}</Table.Cell>

                                            {/* <Table.Cell>
                                                <span onClick={() => {
                                                    setshowModal(true);
                                                    setcommentIdToDelete(user._id)
                                                }} className='text-red-500 hover:underline 
                                                cursor-pointer font-medium'>Delete</span>
                                            </Table.Cell> */}

                                        </Table.Row>
                                    </Table.Body>

                                )
                            })
                        }
                    </>
                    {
                        showMore && <button onClick={handleShowMore}
                            className='w-full p-3 self-center text-blue-600  text-sm'>{Loading ? <Spinner /> : "Show more"}</button>
                    }

                </Table>



            ) : (<p>You have no comments yet! <span>{Loading ? <Spinner className='flex justify-center
             items-center min-h-screen mx-auto' size="lg" /> : "You have no comments yet!"}</span></p>)
            }
            {/* <Modal show={showModal} onClose={() => setshowModal(false)} popup size="md" >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-12 w-12 text-gray-400 mb-4 mx-auto' />
                        <h3 className='text-lg mb-4 text-gray-700'>Do you want to delete this comment?</h3>
                        <div className='flex justify-between gap-4'>
                            <Button color="failure"  >Yes</Button>
                            <Button onClick={() => setshowModal(false)} color="gray">cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal> */}


        </div >
    )
}
export default DashComments










