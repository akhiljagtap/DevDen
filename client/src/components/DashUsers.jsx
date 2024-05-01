import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { Button, Modal, Table } from "flowbite-react"
import { HiOutlineExclamationCircle } from 'react-icons/hi2'
import { FaCheck, FaTimes } from "react-icons/fa"
import { Spinner } from "flowbite-react"


function DashUsers() {
    const [users, setusers] = useState([])
    const [showMore, setshowMore] = useState(true)
    const [showModal, setshowModal] = useState(false)
    const [loading, setloading] = useState(false)
    const [userIdToDelete, setuserIdToDelete] = useState('')
    const { currentUser } = useSelector((state) => state.user)

    // console.log(users);
    // console.log(userIdToDelete);

    // console.log(userposts);
    useEffect(() => {
        const fetchUser = async () => {
            setloading(true)
            try {
                const res = await fetch(`/api/user/getusers`)
                const data = await res.json()
                if (res.ok) {
                    setloading(false)
                    setusers(data.users)
                    if (data.users.length < 9) {
                        setshowMore(false)
                    }
                }

            } catch (error) {
                setloading(false)
                console.log(error.messag);

            }
        }
        if (currentUser.isAdmin) {
            fetchUser()

        }
    }, [currentUser._id])




    const handleShowMore = async () => {
        const startIndex = users.length
        try {
            setloading(true)
            const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`)
            const data = await res.json()
            if (res.ok) {
                setloading(false)
                setusers((prev) => [...prev, ...data.users])
                if (data.users.length < 9) {
                    setshowMore(false)
                }
            }


        } catch (error) {
            setloading(false)
            console.log(error);

        }
    }
    const handleDeleteuser = async () => {
        try {
            setloading(true)
            const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
                method: "DELETE"
            })
            const data = await res.json()
            if (!res.ok) {
                setloading(false)
                console.log(data.message);
            } else {

                setusers((prev) => prev.filter((user) => user._id !== userIdToDelete))
                setshowModal(false)
                setloading(false)

            }


        } catch (error) {
            setloading(false)
            console.log(error.message);

        }

    }

    // if (loading) return (
    //     <div className='flex justify-center items-center min-h-screen mx-auto'>
    //         <Spinner size="xl"></Spinner>
    //     </div>
    // )





    return (
        <div className='table-auto p-3 md:mx-auto '>
            {currentUser.isAdmin && users.length > 0 ? (

                <Table hoverable className='shadow-md'>
                    <Table.Head>
                        <Table.HeadCell>Created date</Table.HeadCell>
                        <Table.HeadCell>User image</Table.HeadCell>
                        <Table.HeadCell>Username </Table.HeadCell>
                        <Table.HeadCell> Email</Table.HeadCell>
                        <Table.HeadCell>Admin</Table.HeadCell>
                        <Table.HeadCell>Delete</Table.HeadCell>

                    </Table.Head>
                    <>
                        {
                            users.map((user) => {
                                return (
                                    <Table.Body className='divide-y'>
                                        <Table.Row className='font-medium bg-white dark:bg-gray-900'>
                                            <Table.Cell className='font-medium'>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>


                                            <Table.Cell>
                                                <img src={user.avtar} alt={user.username}
                                                    className='w-8 h-8 bg-gray-500 rounded-full' />
                                            </Table.Cell>


                                            <Table.Cell>
                                                <p className='text-gray-900 dark:text-gray-300'>{user.username}</p>
                                            </Table.Cell>

                                            <Table.Cell>{user.email}</Table.Cell>
                                            <Table.Cell>{user.isAdmin ? (<FaCheck className='text-green-400' />)
                                                : (<FaTimes className='text-red-600' />)}</Table.Cell>
                                            <Table.Cell>
                                                <span onClick={() => {
                                                    setshowModal(true);
                                                    setuserIdToDelete(user._id)
                                                }} className='text-red-500 hover:underline 
                                                cursor-pointer font-medium'>Delete</span>
                                            </Table.Cell>

                                        </Table.Row>
                                    </Table.Body>

                                )
                            })
                        }
                    </>
                    {
                        showMore && <button onClick={handleShowMore}
                            className='w-full p-3 self-center text-blue-600  text-sm'>{loading ? <Spinner /> : "Show more"}</button>
                    }

                </Table>



            ) : (<p>No user found!<span>{loading ? <Spinner className='flex justify-center items-center 
            min-h-screen mx-auto' size="lg" /> : "No user found!"}</span></p>)
            }
            <Modal show={showModal} onClose={() => setshowModal(false)} popup size="md" >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <h3 className='font-semibold'>Delete user</h3>
                        {/* <HiOutlineExclamationCircle className='h-12 w-12 text-gray-400 mb-4 mx-auto' /> */}
                        <h3 className='text-md mb-4 text-gray-700'>Delete this user permanently?</h3>
                        <div className='flex justify-between gap-4'>
                            <Button className='text-blue-600 hover:bg-blue-200' color="transperant"
                                onClick={handleDeleteuser}>Yes</Button>
                            <Button onClick={() => setshowModal(false)} color="transperant"
                                className='text-blue-600 hover:bg-blue-200' pill>cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


        </div >
    )
}
export default DashUsers










